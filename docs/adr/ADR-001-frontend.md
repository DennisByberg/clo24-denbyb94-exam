# ADR-001: Frontend Technology Stack

**Status:** Accepted  
**Date:** 2025-10-31  
**Decision Makers:** Dennis Byberg

## Context and Problem Statement

The project needs a modern frontend solution to build a responsive web application.

## Decision Drivers

- SEO and performance requirements
- Azure deployment capabilities
- Type safety to reduce runtime errors
- Modern developer experience
- Strong community support

## Decision

We use **React + TypeScript + Next.js** as the frontend technology stack.

**Rationale:**

- React is industry standard with extensive documentation
- TypeScript provides type safety and better developer experience
- Next.js solves SEO with SSR/SSG out-of-the-box
- Excellent Azure App Service integration
- Built-in optimizations for performance

Additional motivation: The choice aligns with the tech stack used at the expected internship placement, facilitating knowledge transfer and reducing onboarding costs.

## Consequences

### Positive Consequences

- Strong type safety reduces runtime errors
- Excellent SEO with built-in SSR/SSG
- Optimized performance out-of-the-box
- Smooth Azure deployment
- Large community for support

### Negative Consequences

- Longer learning curve for beginners
- More complexity than vanilla JavaScript

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
