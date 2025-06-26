# Email Design Framework

[![MJML](https://img.shields.io/badge/Built%20with-MJML-orange.svg)](https://mjml.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/refine-digital/email-design-framework/pulls)

A professional framework for building responsive, on-brand HTML emails with MJML and Automatic CSS. This repository provides a highly modular, reusable, and configurable system for developers.

## Table of Contents

* [Project Goal](#project-goal)
* [The Framework Ecosystem](#the-framework-ecosystem)
* [Features](#features)
* [Getting Started](#getting-started)
* [Project Structure](#project-structure)
* [How to Use](#how-to-use)
* [Automation](#automation)
* [Security Notice](#security-notice)
* [Contributing](#contributing)
* [License](#license)

## Project Goal

The goal is to create world-class HTML email templates that perfectly match a website's brand identity by translating styles from the Automatic CSS (ACSS) framework into the MJML email framework.

## The Framework Ecosystem

This repository is the core of a larger system. The full ecosystem consists of three distinct projects:

1.  **Email Design Framework (This Repo)**: The core library containing all default templates, patterns, layouts, and elements. It is intended to be consumed as a dependency (NPM package).
2.  **Client Email Design Framework**: A project template for creating a client-specific version of the framework, allowing for deep customization and style importation.
3.  **Email Boilerplate**: A minimal starter project for building a single, specific email (e.g., a newsletter, a transactional email) using either the core or a client-specific framework.

## Features

* **MJML-Based**: Utilizes the powerful MJML framework for generating responsive HTML that works in top email clients.
* **Modular Architecture**: A five-tier structure (`emails`, `designs`, `patterns`, `layouts`, `elements`) makes templates easy to build, customize, and maintain.
* **ACSS Integration**: Includes a Node.js script to automatically import CSS variables and classes from an `automatic.css` file, ensuring brand consistency.
* **Dynamic Content with Tokens**: Supports a simple token system (`{{your.token.here}}`) for easy integration with any email delivery platform.
* **Professional DevOps**: Pre-configured VS Code environment for streamlined development, formatting, and linting.
* **Customizable**: Designed to be extended with client-specific styles and components.

## Getting Started

Follow these instructions to set up the development environment.

### Prerequisites

1.  **VS Code**: The required editor for this project.
2.  **Node.js & NPM**: Required for dependency management and running scripts.
3.  **Git**: For version control.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/refine-digital/email-design-framework.git
    cd email-design-framework
    ```

2.  **Install VS Code Extensions:**
    When you open the project in VS Code, you will be prompted to install the recommended extensions listed in `.vscode/extensions.json`. Click **Install All** to proceed.

3.  **Install NPM Dependencies:**
    ```bash
    npm install
    ```

## Project Structure

The framework uses a logical, cascading structure within the `src/` directory.

```
/src
├── 1_emails/       # Complete, ready-to-use email themes (e.g., newsletters)
├── 2_designs/      # Reusable email parts (e.g., header, footer, body)
├── 3_patterns/     # UI components combining layouts & elements (e.g., confirmation boxes)
├── 4_layouts/      # Structural components (e.g., sections, columns)
└── 5_elements/     # Basic MJML components (e.g., styled text, buttons)
```

* **`1_emails`**: These are the final, composable email templates. Each file represents a complete email theme (e.g., a newsletter, a signature) and is built by including various parts from the `2_designs` directory.
* **`2_designs`**: Contains the main structural parts of an email (`top`, `header`, `body`, `footer`, `bottom`). This directory also holds the master styling files (`style.mjml`, `_classes.mjml`, `_attributes.mjml`) and the ACSS import-related files.
* **`3_patterns`**: Reusable UI/UX patterns built from layouts and elements. These are context-aware components like "primary call-to-action," "warning message," or "information box."
* **`4_layouts`**: The foundational structural MJML tags that define the grid and spacing of the email, such as wrappers, sections, columns, and groups.
* **`5_elements`**: The lowest-level components, representing styled, individual MJML elements like `<mj-text>`, `<mj-button>`, or `<mj-image>`.

## How to Use

### Previewing Emails

1.  Open any `.mjml` file from the `src/1_emails/` directory.
2.  Open the VS Code Command Palette (`Cmd+Shift+P`).
3.  Run the command **MJML: Open Preview to the Side**.

The preview will automatically update as you edit and save the main file or any of its included partials.

### Creating a New Email

1.  Create a new file, e.g., `src/1_emails/2_newsletters/my-new-newsletter.mjml`.
2.  Build your email by including the necessary design parts:

    ```mjml
    <mjml>
      <mj-head>
        <!-- Include shared head content, styles, and attributes -->
        <mj-include path="../2_designs/style.mjml" />
      </mj-head>
      <mj-body>
        <!-- Include design parts to compose the email -->
        <mj-include path="../2_designs/2_header/_header-1.mjml" />
        <mj-include path="../2_designs/3_body/_body-1.mjml" />
        <mj-include path="../2_designs/4_footer/_footer-1.mjml" />
      </mj-body>
    </mjml>
    ```

## Automation

For client projects, you can automatically generate `style.mjml` from an `automatic.css` file.

1.  Place your client's `automatic.css` file in `/src/2_designs/acss/`.
2.  Configure `/src/2_designs/acss/style.json` to specify which CSS categories to import.
3.  Run the import script from the root directory:
    ```bash
    node ./scripts/import-style-from-acss.js
    ```
This will generate a new `style.mjml` file in `/src/2_designs/` with all the corresponding MJML classes.

## Security Notice

This template uses **MJML v4**, which has known high-severity vulnerabilities in its transitive dependencies (`html-minifier` and `mjml-migrate`). These issues cannot be resolved with `npm audit fix` in this version.

The long-term solution is an upgrade to MJML v5 or newer once stable. For local development and static email compilation, the direct threat of these vulnerabilities is generally low, but users should evaluate the risk for their own use case.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes. Ensure your code adheres to the formatting rules (2-space tabs).
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
