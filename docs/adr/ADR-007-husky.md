# ADR-007: Husky for Git Hooks

**Status:** Accepted  
**Date:** 2025-11-05  
**Decision Makers:** Dennis Byberg

## Context and Problem Statement

The project needs automated code quality checks before commits.

## Decision Drivers

- Requested by internship placement (ESS Group)
- Prevents committing bad code
- Automates linting and formatting checks
- Industry standard practice

## Considered Alternatives

No alternatives were seriously considered. Husky was recommended by ESS Group as part of their development workflow.

## Decision

We will use **Husky** for Git hooks management.

**Rationale:**

- **Internship recommendation**: ESS Group requested this for code quality
- **Automated checks**: Runs linting/formatting before commits
- **Early error detection**: Catches issues before they reach repository
- **Industry standard**: Common tool in professional JavaScript projects
- **Easy setup**: Integrates with package.json

## Consequences

### Positive Consequences

- Catches linting/formatting errors before commit
- Aligns with ESS Group's workflow
- Prevents bad code from reaching repository
- Learning professional development practices

### Negative Consequences

- Adds a few seconds to commit time
- Extra time to set up initially
- Additional dependency to manage

## References

- [Husky Documentation](https://typicode.github.io/husky/)
