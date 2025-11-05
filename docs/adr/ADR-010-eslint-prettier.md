# ADR-010: ESLint and Prettier for Code Quality

**Status:** Accepted  
**Date:** 2025-11-05  
**Decision Makers:** Dennis Byberg

## Context and Problem Statement

The project needs tools to maintain code quality and consistent formatting across the codebase.

## Decision Drivers

- Need consistent code style
- Catch common errors early
- Used extensively in education
- Industry standard tools
- Works with Husky for automated checks

## Considered Alternatives

No alternatives were seriously considered. ESLint and Prettier are standard tools I've used throughout my education.

## Decision

We will use **ESLint** for code quality and **Prettier** for code formatting.

**Rationale:**

- **Familiar tools**: Used extensively during education
- **Standard practice**: Industry standard for JavaScript/TypeScript projects
- **Complementary**: ESLint handles code quality, Prettier handles formatting
- **TypeScript support**: Both work well with TypeScript
- **Husky integration**: Run automatically via Git hooks (ADR-007)
- **ESS Group alignment**: Likely used at internship (standard tools)

## Consequences

### Positive Consequences

- Consistent code formatting across project
- Catches errors and bad practices early
- Familiar tools from education
- Automatic enforcement via Husky

### Negative Consequences

- Two additional dependencies
- Configuration needed for TypeScript and Next.js
- Can conflict if not configured properly

## References

- [ESLint Documentation](https://eslint.org/)
- [Prettier Documentation](https://prettier.io/)
