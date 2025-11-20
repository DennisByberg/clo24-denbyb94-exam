# ADR-018: Ruff as Python Linter and Formatter

**Status:** Accepted  
**Date:** 2025-11-11  
**Decision Makers:** Dennis Byberg

## Context and Problem Statement

The project needs a code linting and formatting tool to ensure consistent code quality and style across the Python backend codebase.

## Decision Drivers

- Used at internship placement (ESS Group)
- Prepare for internship by learning their stack
- Modern Python tooling
- Need unified linting and formatting solution
- Good documentation

## Considered Alternatives

### Black + Flake8 + isort (Traditional Stack)

- **Pros:**
  - Already familiar with Black from education
  - Widely adopted and well-documented
  - Separate tools for specific purposes
  - Industry standard
- **Cons:**
  - Not used at ESS Group
  - Requires multiple tools (Black, Flake8, isort)
  - Slower than modern alternatives
  - More configuration needed

## Decision

We will use **Ruff** as the Python linter and formatter.

**Rationale:**

- **Internship alignment**: ESS Group uses Ruff - learning it now prepares for internship
- **Unified tooling**: Single tool replaces Black, Flake8, and isort
- **Modern and fast**: Built in Rust for exceptional performance (10-100x faster)
- **Excellent documentation**: Well-documented and easy to configure
- **Black-compatible**: Drop-in replacement for Black's formatting style
- **Comprehensive**: Linting, formatting, and import sorting in one tool

**Note:** Would normally use Black (more familiar from education), but choosing Ruff to align with internship tech stack and benefit from unified, modern tooling.

## Consequences

### Positive Consequences

- Prepares for internship at ESS Group
- Significantly faster than Black + Flake8 + isort
- Learning modern Python tooling
- Single tool simplifies configuration and CI/CD
- Compatible with Black's formatting

### Negative Consequences

- Need to learn new tool (unfamiliar)
- Newer tool with smaller community than Black
- May encounter edge cases not covered yet

## References

- [Ruff Documentation](https://docs.astral.sh/ruff/)
