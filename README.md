# Email Project Template

This repository provides a robust and standardized template for building HTML email signatures and other responsive email assets using the MJML framework, integrated with VS Code and Git best practices.

## Project Structure Overview
```
email-design-framework (root folder)
├── .git/
├── .vscode/
│   ├── extensions.json
│   └── settings.json
├── node_modules/
│   ├── mjml... (all modules)
│   ├── postcss
│   ├── postcss-safe-parser
│   └── others...
├── scripts/
│   └── import-style-from-acss.js
├── src/
│   ├── 1_emails/
│   │   ├── 1_default/
│   │   │   ├── default.mjml
│   │   │   ├── elements.mjml
│   │   │   └── patterns.mjml
│   │   ├── 2_newsletters/
│   │   │   ├── newsletter-1.mjml
│   │   │   ├── newsletter-2.mjml
│   │   │   └── newsletter-{n}.mjml
│   │   ├── 3_notifications/
│   │   │   ├── notifications-1.mjml
│   │   │   ├── notifications-2.mjml
│   │   │   └── notifications-{n}.mjml
│   │   ├── 4_confirmations/
│   │   │   ├── confirmation-1.mjml
│   │   │   ├── confirmation-2.mjml
│   │   │   └── confirmation-{n}.mjml
│   │   ├── 5_alerts/
│   │   │   ├── alert-1.mjml
│   │   │   ├── alert-2.mjml
│   │   │   └── alert-{n}.mjml
│   │   ├── 6_warnings/
│   │   │   ├── warning-1.mjml
│   │   │   ├── warning-2.mjml
│   │   │   └── warning-{n}.mjml
│   │   ├── 7_signatures/
│   │   │   ├── signature-1.mjml
│   │   │   ├── signature-2.mjml
│   │   │   └── signature-{n}.mjml
│   │   ├── 8_reserved/
│   │   ├── 9_reserved/
│   │   ├── 10_reserved/
│   │   ├── 11_reserved/
│   │   ├── 12_reserved/
│   │   ├── 13_reserved/
│   │   ├── 14_reserved/
│   │   ├── 15_reserved/
│   │   ├── 16_reserved/
│   │   ├── 17_reserved/
│   │   ├── 18_reserved/
│   │   └── 19_reserved/
│   ├── 2_designs/
│   │   ├── 1_top/
│   │   │   ├── _top-1.mjml
│   │   │   ├── _top-2.mjml
│   │   │   └── _top-{n}.mjml
│   │   ├── 2_header/
│   │   │   ├── _header-1.mjml
│   │   │   ├── _header-2.mjml
│   │   │   └── _header-{n}.mjml
│   │   ├── 3_body/
│   │   │   ├── _body-1.mjml
│   │   │   ├── _body-2.mjml
│   │   │   └── _body-{n}.mjml
│   │   ├── 4_footer/
│   │   │   ├── _footer-1.mjml
│   │   │   ├── _footer-2.mjml
│   │   │   └── _footer-{n}.mjml
│   │   ├── 5_bottom/
│   │   │   ├── _bottom-1.mjml
│   │   │   ├── _bottom-2.mjml
│   │   │   └── _bottom-{n}.mjml
│   │   ├──acss/
│   │   │   ├── automatic.css
│   │   │   ├── framework.json
│   │   │   └── style.json
│   │   ├── _attributes.mjml
│   │   ├── _classes.mjml
│   │   ├── style-custom.mjml
│   │   └── style.mjml
│   ├── 3_patterns/
│   │   ├── 1_primary/
│   │   │   ├── primary-1.mjml
│   │   │   ├── primary-2.mjml
│   │   │   └── primary-{n}.mjml
│   │   ├── 2_secondary/
│   │   │   ├── secondary-1.mjml
│   │   │   ├── secondary-2.mjml
│   │   │   └── secondary-{n}.mjml
│   │   ├── 3_information/
│   │   │   ├── information-1.mjml
│   │   │   ├── information-2.mjml
│   │   │   └── information-{n}.mjml
│   │   ├── 4_success/
│   │   │   ├── success-1.mjml
│   │   │   ├── success-2.mjml
│   │   │   └── success-{n}.mjml
│   │   ├── 5_warning/
│   │   │   ├── warning-1.mjml
│   │   │   ├── warning-2.mjml
│   │   │   └── warning-{n}.mjml
│   │   ├── 6_danger/
│   │   │   ├── danger-1.mjml
│   │   │   ├── danger-2.mjml
│   │   │   └── danger-{n}.mjml
│   │   ├── 7_reserved/
│   │   ├── 8_reserved/
│   │   └── 9_reserved/
│   ├── 4_layouts/
│   │   ├── 1_wrappers/
│   │   │   ├── wrapper-1.mjml
│   │   │   ├── wrapper-2.mjml
│   │   │   └── wrapper-{n}.mjml
│   │   ├── 2_sections/
│   │   │   ├── section-1.mjml
│   │   │   ├── section-2.mjml
│   │   │   └── section-{n}.mjml
│   │   ├── 3_groups/
│   │   │   ├── group-1.mjml
│   │   │   ├── group-2.mjml
│   │   │   └── group-{n}.mjml
│   │   ├── 4_columns/
│   │   │   ├── column-1.mjml
│   │   │   ├── column-2.mjml
│   │   │   └── column-{n}.mjml
│   │   └── 5_spacers/
│   │       ├── spacer-1.mjml
│   │       ├── spacer-2.mjml
│   │       └── spacer-{n}.mjml
│   ├── 5_elements/
│   │   ├── 1_headings/
│   │   │   ├── _heading-1.mjml
│   │   │   ├── _heading-2.mjml
│   │   │   └── _heading-{n}.mjml
│   │   ├── 2_paragraphs/
│   │   │   ├── _paragraph-1.mjml
│   │   │   ├── _paragraph-2.mjml
│   │   │   └── _paragraph-{n}.mjml
│   │   ├── 3_images/
│   │   │   ├── _image-1.mjml
│   │   │   ├── _image-2.mjml
│   │   │   └── _image-{n}.mjml
│   │   ├── 4_links/
│   │   │   ├── _link-1.mjml
│   │   │   ├── _link-2.mjml
│   │   │   └── _link-{n}.mjml
│   │   ├── 5_buttons/
│   │   │   ├── _button-1.mjml
│   │   │   ├── _button-2.mjml
│   │   │   └── _button-{n}.mjml
│   │   ├── 6_dividers/
│   │   │   ├── _divider-1.mjml
│   │   │   ├── _divider-2.mjml
│   │   │   └── _divider-{n}.mjml
│   │   ├── 7_tables/
│   │   │   ├── _table-1.mjml
│   │   │   ├── _table-2.mjml
│   │   │   └── _table-{n}.mjml
│   │   ├── 8_reserved/
│   │   ├── 9_reserved/
│   │   ├── 10_heroes/
│   │   │   ├── _hero-1.mjml
│   │   │   ├── _hero-2.mjml
│   │   │   └── _hero-{n}.mjml
│   │   ├── 11_accordions/
│   │   │   ├── _accordion-1.mjml
│   │   │   ├── _accordion-2.mjml
│   │   │   └── _accordion-{n}.mjml
│   │   ├── 12_carousels/
│   │   │   ├── _carousel-1.mjml
│   │   │   ├── _carousel-2.mjml
│   │   │   └── _carousel-{n}.mjml
│   │   ├── 13_navbars/
│   │   │   ├── _navbar-1.mjml
│   │   │   ├── _navbar-2.mjml
│   │   │   └── _navbar-{n}.mjml
│   │   ├── 14_socials/
│   │   │   ├── _social-1.mjml
│   │   │   ├── _social-2.mjml
│   │   │   └── _social-{n}.mjml
│   │   ├── 15_reserved/
│   │   ├── 16_reserved/
│   │   ├── 17_reserved/
│   │   ├── 18_reserved/
│   │   ├── 19_reserved/
│   │   ├── elements-1.mjml
│   │   ├── elements-2.mjml
│   │   └── elements-3.mjml
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Known Security Vulnerabilities

Please be aware that this template, while using the stable MJML v4, currently inherits some **high-severity security vulnerabilities** from its transitive dependencies, specifically `html-minifier` (CVE-2022-44675, a Regular Expression Denial of Service - REDoS vulnerability) and `mjml-migrate`.

These issues cannot be automatically resolved by `npm audit fix` while staying on the MJML v4 branch, as the patched versions of the affected sub-dependencies (like `html-minifier@^5.0.1`) are not compatible or available for automatic upgrade within MJML v4's dependency tree on npm.

The long-term solution is an upgrade to a stable MJML v5 or newer when it becomes available and fully addresses these transitive dependencies. Users should evaluate the risk for their specific use case. For local development and static email compilation, the direct threat surface of these vulnerabilities is generally low.
