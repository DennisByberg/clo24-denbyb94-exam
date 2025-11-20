# ADR-020: Azure Easy Auth with Google OAuth

**Status:** Accepted  
**Date:** 2025-11-19  
**Decision Makers:** Dennis Byberg

## Context and Problem Statement

The project needs a user authentication solution for the booking platform. Users must be able to log in securely to create and manage their bookings. How should we handle user authentication without managing user credentials ourselves?

## Decision Drivers

- Supervisor recommendation for simple login solution
- Azure App Service already chosen as deployment platform
- Don't want to manage user passwords and credentials
- Need secure authentication without complex implementation
- Users already have Google accounts

## Considered Alternatives

No other alternatives were seriously considered. Azure Easy Auth was the obvious choice given:

- Supervisor's recommendation for simple authentication
- Already using Azure App Service (Easy Auth is built-in)
- Want to avoid managing user credentials

For reference, other authentication approaches exist but were not evaluated:

### Custom OAuth Implementation

Would require implementing OAuth flow manually - too complex and time-consuming.

### Auth0 or Firebase Auth

Third-party managed auth services - unnecessary cost and complexity when Easy Auth is already available.

## Decision

We will use **Azure Easy Auth with Google OAuth** for authentication.

**Rationale:**

- **Supervisor recommendation**: Strongly recommended simple login solution - Easy Auth is the simplest option
- **Azure integration**: Already using Azure App Service, Easy Auth is built-in and free
- **No credential management**: Don't want to handle passwords, hashing, or user security - Microsoft handles everything
- **Zero implementation**: Authentication happens at platform level, no code needed in application
- **Google OAuth**: Users already have Google accounts, no need to create new credentials
- **Security**: Microsoft manages OAuth flow, token validation, and security patches
- **HTTP headers**: User information passed via headers (X-MS-CLIENT-PRINCIPAL-ID), easy to consume

**Note:** The decision was straightforward - Azure Easy Auth was the only option considered. Since we're using Azure App Service and the supervisor recommended simple authentication, Easy Auth was the clear and only choice evaluated.

## Consequences

### Positive Consequences

- No authentication code to write or maintain
- No user password management or security risks
- Free (included with Azure App Service)
- Users can login with existing Google accounts
- Microsoft handles all OAuth complexity and security
- Authentication works automatically before requests reach application

### Negative Consequences

- Tied to Azure App Service (can't easily switch platforms)
- Limited customization of authentication flow
- Testing locally requires mocking headers
- Dependent on Microsoft's Easy Auth service

## References

- [Azure App Service Authentication Documentation](https://learn.microsoft.com/en-us/azure/app-service/overview-authentication-authorization)
