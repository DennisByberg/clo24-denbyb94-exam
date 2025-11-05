# ADR-003: TypeScript for Type Safety

**Status:** Accepted  
**Date:** 2025-10-31  
**Decision Makers:** Dennis Byberg

## Context and Problem Statement

The project needs to decide between JavaScript and TypeScript for the frontend codebase.

## Decision Drivers

- Already familiar with TypeScript from education
- Better IDE support and autocomplete
- Catches errors before runtime
- Feels more natural to work with

## Considered Alternatives

### Vanilla JavaScript

- **Pros:**
  - ESS Group uses some vanilla JS
  - No compilation step
  - Simpler setup
- **Cons:**
  - No type checking
  - Less IDE support
  - More runtime errors

## Decision

We will use **TypeScript** for the frontend codebase.

**Rationale:**

- **Already familiar**: Learned TypeScript during education
- **Better tooling**: Autocomplete and error checking in IDE
- **Catches bugs early**: Type errors found before running code
- **More natural**: Feels more comfortable to work with types
- **Industry standard**: Most modern React projects use TypeScript

## Consequences

### Positive Consequences

- Better IDE support with autocomplete
- Catches errors before running code
- Easier to refactor code safely
- Types document the code

### Negative Consequences

- Slightly more verbose than vanilla JS
- Need to write type annotations

## References

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
