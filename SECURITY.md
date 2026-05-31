# Security Policy

MogoH5+ is a legacy Vue 2 and HBuilder/H5+ scaffold. The current maintenance focus is to review dependency risk, document safe usage, and provide migration guidance for existing users.

## Supported Versions

The project does not currently publish actively supported release lines. Security work is handled on the `master` branch first, with release notes added when a fix is suitable for existing users.

## Reporting a Vulnerability

Please report security issues through GitHub Issues if the details are not sensitive. For sensitive reports, contact the maintainer privately before publishing exploit details.

When reporting, include:

- Affected dependency or source file
- Steps to reproduce or a minimal proof of concept
- Node.js, npm, HBuilder, and platform versions
- Whether the issue affects development builds, production builds, or runtime WebView behavior

## Current Security Priorities

- Audit old npm dependencies used by the Vue/Webpack build
- Review HBuilder/H5+ runtime integration patterns
- Identify unsafe dependency versions and vulnerable build plugins
- Document safer upgrade paths for existing projects
- Keep compatibility risks visible before large dependency migrations
