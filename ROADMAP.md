# Maintenance Roadmap

This roadmap tracks the 2026 maintenance restart for MogoH5+.

## Phase 1: Project Hygiene

- Add security reporting guidance
- Add contribution guidance
- Enable automated dependency visibility
- Review existing documentation links and examples

## Phase 2: Dependency Review

- Inventory npm dependencies and known vulnerabilities
- Identify dependencies that can be safely patched without breaking Webpack 3
- Document dependencies that require a larger migration
- Add notes for supported Node.js/npm versions

## Phase 3: Migration Guidance

- Document how existing HBuilder/H5+ projects can stay on the legacy scaffold safely
- Explore a modernized scaffold path for newer Vue and build tooling
- Keep legacy compatibility notes separate from future migration work

## Phase 4: Maintenance Automation

- Add lightweight checks where they can run reliably on the legacy stack
- Triage dependency alerts into actionable issues
- Improve issue and pull request templates if community activity resumes
