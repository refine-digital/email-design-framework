# Email Project Template

This repository provides a robust and standardized template for building HTML email signatures and other responsive email assets using the MJML framework, integrated with VS Code and Git best practices.

## Project Structure Overview
```
src/
├── components/
│   ├── body/
│   │   ├── _accordion.mjml
│   │   ├── _body.mjml
│   │   ├── _button.mjml
│   │   ├── _carousel.mjml
│   │   ├── _column.mjml
│   │   ├── _divider.mjml
│   │   ├── _group.mjml
│   │   ├── _hero.mjml
│   │   ├── _image.mjml
│   │   ├── _navbar.mjml
│   │   ├── _raw.mjml
│   │   ├── _section.mjml
│   │   ├── _social.mjml
│   │   ├── _spacer.mjml
│   │   ├── _table.mjml
│   │   ├── _text.mjml
│   │   └── _wrapper.mjml
│   ├── footer/
│   │   └── _footer.mjml
│   ├── header/
│   │   └── _header.mjml
│   └── pre/
│       └── _pre.mjml
├── design/
│   ├── _head.mjml
│   ├── style.css
│   └── style.json
├── images/
│   └── external.json
└── index.mjml
```

### `src/` Directory Breakdown:

* **`src/index.mjml`**:
    This is the **main entry point** for compiling your email template. It orchestrates the entire email structure by including various components and design elements from other subdirectories. This is the file you would typically pass to the MJML compiler.

* **`src/components/`**:
    This directory houses all the **reusable MJML partials** that form the building blocks of your email. Each subdirectory within `components/` groups related MJML elements into distinct, manageable modules.

    * **`body/`**: Contains core body components. While many individual MJML tags are listed (e.g., `_accordion.mjml`, `_button.mjml`), these are intended as pre-styled or pre-configured reusable versions of the native MJML tags. `_body.mjml` would serve as a wrapper or default structure for the main content area of the email, and `_signature.mjml` (if present) would hold your primary signature content.

    * **`footer/`**: Contains the MJML for the email's footer section (e.g., disclaimers, company address, unsubscribe links).

    * **`header/`**: Contains the MJML for the email's header section (e.g., logo, main heading, navigation).

    * **`pre/`**: Contains the MJML for the pre-header text, which is typically a short summary visible in the email client's inbox list.

* **`src/design/`**:
    This directory holds **global design elements and styling configurations** that apply across your entire email template.

    * **`_head.mjml`**: This crucial file consolidates all elements that belong within the HTML `<head>` section of your compiled email. This includes global `<mj-attributes>` for default component styling, `<mj-breakpoint>` for responsive behavior, `<mj-font>` declarations, and global CSS rules defined within `<mj-style>` tags (often imported from `style.css`).

    * **`style.css`**: Intended for storing global CSS rules that can be included or inlined into your email's `<mj-style>` tag within `_head.mjml`. This promotes centralized styling.

    * **`style.json`**: This file is designated for defining **design tokens** (e.g., colors, font sizes, spacing values, brand-specific variables) in a structured JSON format. While MJML doesn't natively consume JSON for styling, this serves as a clear, centralized reference for your design system and can be integrated into build processes with additional tooling.

* **`src/images/`**:
    This directory is dedicated to **static image assets** used within your email template.

    * **`external.json`**: This file is designed to hold references or tokens for images that are hosted externally (e.g., on a CDN). This is particularly useful for email development, where images often need to be referenced by their absolute URLs.

## Known Security Vulnerabilities

Please be aware that this template, while using the stable MJML v4, currently inherits some **high-severity security vulnerabilities** from its transitive dependencies, specifically `html-minifier` (CVE-2022-44675, a Regular Expression Denial of Service - REDoS vulnerability) and `mjml-migrate`.

These issues cannot be automatically resolved by `npm audit fix` while staying on the MJML v4 branch, as the patched versions of the affected sub-dependencies (like `html-minifier@^5.0.1`) are not compatible or available for automatic upgrade within MJML v4's dependency tree on npm.

The long-term solution is an upgrade to a stable MJML v5 or newer when it becomes available and fully addresses these transitive dependencies. Users should evaluate the risk for their specific use case. For local development and static email compilation, the direct threat surface of these vulnerabilities is generally low.
