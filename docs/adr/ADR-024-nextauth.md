# ADR-024: NextAuth.js for Authentication

**Status:** Accepted  
**Date:** 2025-12-06  
**Decision Makers:** Dennis Byberg

## Context and Problem Statement

The ACE Group booking platform initially used Azure Easy Auth for authentication, which provided OAuth integration with Google. However, Azure Easy Auth has significant limitations:

1. **Poor UX:** After successful Google OAuth, users are redirected to an ugly, non-customizable Azure page (`.auth/login/done`) that cannot be styled or bypassed
2. **Limited control:** No ability to customize the authentication flow or redirect behavior
3. **Vendor lock-in:** Tightly coupled to Azure infrastructure, making local development and testing difficult
4. **No session management:** Limited ability to extend or customize session data

We need an authentication solution that provides full control over the user experience while maintaining OAuth capabilities.

## Decision Drivers

- **User experience:** Need seamless, branded authentication flow without Azure's default pages
- **Local development:** Must work easily in local development environment
- **Flexibility:** Ability to switch between OAuth providers (Google, GitHub, etc.) and credentials
- **Session management:** Full control over session data and JWT tokens
- **Framework compatibility:** Native support for Next.js App Router
- **Migration path:** Easy to migrate from Azure Easy Auth with minimal backend changes

## Considered Alternatives

### Alternative 1: NextAuth.js v4

- **Pros:**
  - Full control over authentication UI and flow
  - Native Next.js App Router support with Route Handlers
  - Supports multiple providers (OAuth, Credentials, Email)
  - Excellent local development experience
  - Well-documented and actively maintained
  - JWT session management with customizable callbacks
  - Easy to migrate from Azure Easy Auth
- **Cons:**
  - Requires Node.js server (cannot use Static Web App export)
  - Must manage session secrets securely
  - Additional configuration compared to Azure Easy Auth

### Alternative 2: Keep Azure Easy Auth

- **Pros:**
  - Fully managed by Azure
  - No additional configuration needed
  - Automatic security updates
- **Cons:**
  - Ugly, non-customizable success page
  - Poor user experience
  - Limited local development support
  - Vendor lock-in
  - No control over session data

### Alternative 3: Custom OAuth Implementation

- **Pros:**
  - Complete control over every aspect
  - No external dependencies
- **Cons:**
  - High development time
  - Security risks if not implemented correctly
  - Must maintain OAuth flow manually
  - Reinventing the wheel

## Decision

**Chosen Alternative:** NextAuth.js v4

We will migrate from Azure Easy Auth to NextAuth.js v4 for the following reasons:

1. **Superior UX:** Complete control over login/logout flow, no ugly Azure pages
2. **Flexibility:** Can use Credentials Provider for development, add Google OAuth for production later
3. **Developer experience:** Works seamlessly in local environment with `MOCK_AUTH=true` in backend
4. **Future-proof:** Easy to add new providers or authentication methods
5. **Session control:** Backend validates JWT tokens via `python-jose`, enabling custom session data

**Implementation approach:**
- Frontend: NextAuth.js Route Handler at `/api/auth/[...nextauth]/route.ts`
- Backend: JWT validation in `dependencies/auth.py` using `python-jose`
- Development: Credentials Provider with hardcoded test users
- Production: Can migrate to Google OAuth when Azure infrastructure is ready
- Secrets: Store `NEXTAUTH_SECRET` in Azure Key Vault

## Consequences

### Positive Consequences

- ✅ Clean, branded authentication flow without Azure's default pages
- ✅ Full control over session management and user data
- ✅ Easy local development with Credentials Provider
- ✅ Can switch providers (Google, GitHub, etc.) without backend changes
- ✅ Better testing capabilities with mock users
- ✅ Native Next.js App Router integration

### Negative Consequences

- ❌ Cannot use Azure Static Web App (requires Node.js server)
- ❌ Must deploy frontend to Azure App Service instead
- ❌ Increased infrastructure costs (~$10-15/month for B1 App Service)
- ❌ Must manage `NEXTAUTH_SECRET` securely
- ❌ Additional dependency (`next-auth` in frontend, `python-jose` in backend)

### Neutral Consequences

- 🔄 Frontend deployed to App Service instead of Static Web App
- 🔄 Session cookies managed by NextAuth instead of Azure Easy Auth
- 🔄 Backend validates JWT tokens instead of Azure headers

## Related Decisions

- **ADR-020:** Azure Easy Auth (superseded by this decision)
- **ADR-025:** Azure Key Vault for Secrets Management (stores NEXTAUTH_SECRET)
- **ADR-023:** Azure App Service (now used for both frontend and backend)

## References

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [NextAuth.js App Router Guide](https://next-auth.js.org/configuration/initialization#route-handlers-app)
- [Azure Easy Auth Limitations](https://learn.microsoft.com/en-us/azure/app-service/overview-authentication-authorization)
