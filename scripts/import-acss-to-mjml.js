const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const safeParser = require('postcss-safe-parser');

// Define file paths
const ROOT_DIR = path.resolve(__dirname, '..');
const STYLE_JSON_PATH = path.join(ROOT_DIR, 'src', 'design', 'style.json');
const FRAMEWORK_JSON_PATH = path.join(ROOT_DIR, 'src', 'design', 'framework.json');
const OUTPUT_MJML_STYLE_PATH = path.join(ROOT_DIR, 'src', 'design', 'style.mjml');
const STYLE_CSS_PATH = path.join(ROOT_DIR, 'src', 'design', 'style.css');
/**
 * [CORRECTED FUNCTION]
 * Parse the CSS and build a map of className => { prop: value }
 * Uses a robust regex to find all class names within complex selectors.
 */
async function extractCssDeclarations(cssContent) {
    const root = postcss.parse(cssContent, { parser: safeParser });
    const classMap = new Map();

    root.walkRules(rule => {
        // Use a robust regex that finds all valid class names within a selector string.
        // This handles cases like ".foo, .bar" and "body .foo".
        const classNamesInSelector = rule.selector.match(/\.[\w-]+/g);

        if (!classNamesInSelector) {
            return; // This rule does not contain any class selectors.
        }

        const declarations = {};
        rule.walkDecls(decl => {
            // Ignore CSS Custom Properties
            if (!decl.prop.startsWith('--')) {
                declarations[decl.prop] = decl.value;
            }
        });

        if (Object.keys(declarations).length === 0) {
            return; // No declarations to apply.
        }

        // Apply the collected declarations to every class found in the selector.
        for (const classNameWithDot of classNamesInSelector) {
            const className = classNameWithDot.substring(1); // Remove the leading '.'

            // If the class already has properties from a previous rule, merge them.
            const existingDeclarations = classMap.get(className) || {};
            classMap.set(className, { ...existingDeclarations, ...declarations });
        }
    });

    return classMap;
}

/**
 * Parses CSS to find all custom properties from any top-level rule and resolves them.
 */
function extractAndResolveCssVars(cssContent) {
    const root = postcss.parse(cssContent, { parser: safeParser });
    const cssVars = new Map();

    // Walk ALL rules, then check if the selector is a valid scope for global variables.
    root.walkRules(rule => {
        const isVariableScope = rule.selectors.some(s => s.includes(':root') || s.includes('.color-scheme--main'));
        // Ensure the rule is not inside an @media or @supports block.
        if (isVariableScope && rule.parent.type !== 'atrule') {
            rule.walkDecls(/^--/, decl => {
                cssVars.set(decl.prop, decl.value.trim());
            });
        }
    });

    // Iteratively resolve variables until no more changes can be made.
    const maxPasses = 10;
    for (let i = 0; i < maxPasses; i++) {
        let changed = false;
        for (const [key, value] of cssVars.entries()) {
            if (value.includes('var(')) {
                const newValue = value.replace(/var\((--[\w-]+)\)/g, (match, varName) => {
                    return cssVars.get(varName) || match;
                });
                if (newValue !== value) {
                    cssVars.set(key, newValue);
                    changed = true;
                }
            }
        }
        if (!changed) break; // Optimization: exit early if a pass makes no changes.
    }
    return cssVars;
}

/**
 * Utility to format category, category_group, etc.
 */
function toTitleCase(str) {
    return str
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Recursively collect all class paths that match the selected categories
 */
function traverseAndCollectPaths(node, path, categoriesToImport, collectedPaths) {
    if (typeof node !== 'object' || node === null) return;

    if (path.length === 2 && path[0] === 'categories') {
        const categoryName = path[1];
        if (!categoriesToImport.has(categoryName)) return;
    }

    const isClassesBlock = path[path.length - 1] === 'classes';
    if (isClassesBlock) {
        for (const className in node) {
            if (Object.prototype.hasOwnProperty.call(node, className)) {
                collectedPaths.push([...path, className].join('.'));
            }
        }
        return;
    }

    for (const key in node) {
        if (Object.prototype.hasOwnProperty.call(node, key)) {
            traverseAndCollectPaths(node[key], [...path, key], categoriesToImport, collectedPaths);
        }
    }
}

/**
 * Main logic
 */
async function main() {
    try {
        // Step 1: Load style.json and extract categories
        const styleJson = JSON.parse(fs.readFileSync(STYLE_JSON_PATH, 'utf8'));
        const categoriesToImport = new Set(styleJson.import_config?.categories || []);
        console.log('Step 1 Complete. Categories to import:', [...categoriesToImport]);

        // Step 2 : Traverse framework.json to collect class paths
        const frameworkJson = JSON.parse(fs.readFileSync(FRAMEWORK_JSON_PATH, 'utf8'));
        const foundClassPaths = [];
        traverseAndCollectPaths(frameworkJson, [], categoriesToImport, foundClassPaths);
        console.log(`Step 2 & 3 Complete. Found ${foundClassPaths.length} class paths.`);

        // Step 3: category_group classes by category > category_group > class_group
        const groupedClasses = {};
        for (const fullPath of foundClassPaths) {
            const parts = fullPath.split('.');
            if (parts.length < 8) continue;

            const [_, category, , category_group, , class_group, , className] = parts;

            groupedClasses[category] ??= {};
            groupedClasses[category][category_group] ??= {};
            groupedClasses[category][category_group][class_group] ??= [];
            groupedClasses[category][category_group][class_group].push(className);
        }

        // Step 4 : Parse CSS and map class properties
        const styleCss = fs.readFileSync(STYLE_CSS_PATH, 'utf8');
        const cssClassMap = await extractCssDeclarations(styleCss);

        // Step 5 : Generate final MJML content

        // Get the resolved variable map
        const cssVarsMap = extractAndResolveCssVars(styleCss);

        let mjmlOutput = `<mj-attributes>\n`;

        for (const category of Object.keys(groupedClasses)) {
            mjmlOutput += `<!-- ${toTitleCase(category)} -->\n`;

            for (const category_group of Object.keys(groupedClasses[category])) {
                mjmlOutput += `<!-- ${toTitleCase(category_group)} -->\n`;

                for (const class_group of Object.keys(groupedClasses[category][category_group])) {
                    mjmlOutput += `<!-- ${toTitleCase(class_group)} -->\n`;

                    const classList = [...groupedClasses[category][category_group][class_group]].sort();

                    for (const className of classList) {
                        if (cssClassMap.has(className)) {
                            const props = cssClassMap.get(className);

                            // Resolve variables just before outputting
                            const resolvedProps = {};
                            for (const [prop, value] of Object.entries(props)) {
                                let finalValue = value;
                                // Loop to handle vars that resolve to other vars
                                for (let i = 0; i < 5 && finalValue.includes('var('); i++) {
                                     finalValue = finalValue.replace(/var\((--[\w-]+)\)/g, (match, varName) => {
                                        return cssVarsMap.get(varName) || match;
                                    });
                                }
                                resolvedProps[prop] = finalValue;
                            }

                            const inlineAttrs = Object.entries(resolvedProps)
                                .map(([k, v]) => `${k}="${v}"`)
                                .join(' ');
                            mjmlOutput += `<mj-class name="${className}" ${inlineAttrs} />\n`;
                        } else {
                            mjmlOutput += `<mj-class name="${className}" />\n`;
                        }
                    }

                    mjmlOutput += `\n`; // blank line after class_group
                }
            }

            mjmlOutput += `\n`; // blank line after category
        }

        mjmlOutput += `</mj-attributes>`;

        fs.writeFileSync(OUTPUT_MJML_STYLE_PATH, mjmlOutput);
        console.log(`✅ Step 4 Complete. Output written to: ${OUTPUT_MJML_STYLE_PATH}`);

    } catch (error) {
        console.error(`\n--- SCRIPT FAILED ---`);
        console.error(error.stack || error.message);
        process.exit(1);
    }
}

main();
