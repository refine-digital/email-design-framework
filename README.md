# Email Project Template
A template to build HTML Emails using MJML, MJML Extension and Github.

## Known Security Vulnerabilities

Please be aware that this template, while using the stable MJML v4, currently inherits some **high-severity security vulnerabilities** from its transitive dependencies, specifically `html-minifier` (CVE-2022-44675, a Regular Expression Denial of Service - REDoS vulnerability) and `mjml-migrate`.

These issues cannot be automatically resolved by `npm audit fix` while staying on the MJML v4 branch, as the patched versions of the affected sub-dependencies (like `html-minifier@^5.0.1`) are not compatible or available for automatic upgrade within MJML v4's dependency tree on npm.

The long-term solution is an upgrade to a stable MJML v5 or newer when it becomes available and fully addresses these transitive dependencies. Users should evaluate the risk for their specific use case. For local development and static email compilation, the direct threat surface of these vulnerabilities is generally low.