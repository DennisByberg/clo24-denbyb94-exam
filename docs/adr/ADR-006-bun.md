# ADR-006: Bun as JavaScript Package Manager

**Status:** Accepted  
**Date:** 2025-11-05  
**Decision Makers:** Dennis Byberg

## Context and Problem Statement

The project needs a package manager for installing JavaScript/TypeScript dependencies.

## Decision Drivers

- Used at internship placement (ESS Group)
- Learning opportunity for modern tooling
- Fast installation times
- Compatible with npm packages

## Considered Alternatives

### npm (Node Package Manager)

- **Pros:**
  - Already familiar with it from education
  - Most common and well-documented
  - Comes with Node.js
- **Cons:**
  - Not used at ESS Group
  - Slower than modern alternatives

## Decision

We will use **Bun** as the JavaScript package manager.

**Rationale:**

- **Internship alignment**: ESS Group uses Bun - learning it now prepares for internship
- **Learning opportunity**: Good chance to learn modern tooling
- **Fast**: Much faster installation than npm
- **Compatible**: Drop-in replacement for npm (same commands work)
- **All-in-one**: Package manager + test runner + bundler

**Note**: Would normally use npm (more familiar), but choosing Bun to align with internship tech stack and learn modern tools.

## Consequences

### Positive Consequences

- Prepares for internship at ESS Group
- Much faster than npm
- Learning modern tooling
- Compatible with npm packages

### Negative Consequences

- Need to learn new tool (unfamiliar)
- Smaller community than npm
- May encounter compatibility issues

## References

- [Bun Documentation](https://bun.sh/docs)
