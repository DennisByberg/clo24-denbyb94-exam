# ADR-004: Next.js as React Framework

**Status:** Accepted  
**Date:** 2025-10-31  
**Decision Makers:** Dennis Byberg

## Context and Problem Statement

The project needs a React setup for building the booking platform. Should we use a React framework or just Vite + React?

## Decision Drivers

- Used at internship placement (ESS Group)
- Prepare for LIA by learning their stack
- Built-in routing and optimizations
- SEO for public pages

## Considered Alternatives

### Vite + React

- **Pros:**
  - Simpler and more lightweight
  - Fast development server
  - Would personally prefer this
- **Cons:**
  - Not used at ESS Group
  - Manual routing setup needed
  - No SSR/SSG built-in

## Decision

We will use **Next.js** as the React framework.

**Rationale:**

- **Internship alignment**: ESS Group uses Next.js - learning it now prepares for LIA
- **Built-in routing**: File-based routing is convenient
- **SEO support**: SSR/SSG good for public-facing pages
- **Industry standard**: Widely used in professional projects

**Note**: Would have chosen Vite + React for personal preference (simpler), but choosing Next.js to align with internship tech stack.

## Consequences

### Positive Consequences

- Prepares for internship at ESS Group
- Built-in routing and SSR/SSG
- Good for SEO
- Large community and resources

### Negative Consequences

- More complex than Vite + React
- Need to learn Next.js-specific patterns
- More opinionated framework

## References

- [Next.js Documentation](https://nextjs.org/docs)
