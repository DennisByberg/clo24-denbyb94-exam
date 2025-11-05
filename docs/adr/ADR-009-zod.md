# ADR-009: Zod for Runtime Validation

**Status:** Accepted  
**Date:** 2025-11-05  
**Decision Makers:** Dennis Byberg

## Context and Problem Statement

The project needs runtime validation for API responses and form inputs to ensure data safety.

## Decision Drivers

- Need to validate data from backend API
- Form validation for user inputs
- TypeScript integration
- Used some Zod before and want to learn it properly

## Considered Alternatives

No alternatives were seriously considered. I've experimented with Zod a bit before and want to learn it properly now.

## Decision

We will use **Zod** for runtime validation.

**Rationale:**

- **Previous experience**: Used Zod a little before, familiar with basics
- **Learning opportunity**: Want to learn it properly in a real project
- **TypeScript integration**: Automatic type inference from schemas
- **Form validation**: Works with Mantine forms
- **API validation**: Can validate responses from backend

**Note:** Have experimented with Zod before and liked it. Choosing to use it properly now to deepen my understanding of runtime validation.

## Consequences

### Positive Consequences

- Type inference from schemas (no duplicate types)
- Validates API responses at runtime
- Works with Mantine forms
- Learning proper runtime validation

### Negative Consequences

- Need to write schemas for all validated data
- Additional layer to learn properly

## References

- [Zod Documentation](https://zod.dev/)
