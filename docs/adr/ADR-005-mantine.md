# ADR-005: Mantine as UI Component Library

**Status:** Accepted  
**Date:** 2025-11-05  
**Decision Makers:** Dennis Byberg

## Context and Problem Statement

The project needs a UI component library for building the booking platform interface.

## Decision Drivers

- Used at internship placement (ESS Group)
- Prepare for LIA by learning their stack
- Good TypeScript support
- Comprehensive component set

## Considered Alternatives

### Material-UI (MUI)

- **Pros:**
  - Most popular React UI library
  - Large community
  - Comprehensive documentation
- **Cons:**
  - Not used at ESS Group
  - Larger bundle size
  - Material Design aesthetic

## Decision

We will use **Mantine** as the UI component library.

**Rationale:**

- **Internship alignment**: ESS Group uses Mantine - learning it now prepares for LIA
- **TypeScript support**: Built with TypeScript, good autocomplete
- **Comprehensive**: 100+ components for forms, tables, modals, date pickers, etc.
- **Built-in form handling**: @mantine/form included
- **Good documentation**: Easy to learn with examples

**Note**: Material-UI is more popular, but choosing Mantine to align with internship tech stack.

## Consequences

### Positive Consequences

- Prepares for internship at ESS Group
- Pre-built components speed up development
- Built-in form handling (@mantine/form)
- Good TypeScript support

### Negative Consequences

- Smaller community than Material-UI
- Need to learn Mantine-specific patterns
- Less resources online

## References

- [Mantine Documentation](https://mantine.dev/)
