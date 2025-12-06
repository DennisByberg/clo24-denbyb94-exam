# ADR-025: Azure Key Vault for Secrets Management

**Status:** Accepted  
**Date:** 2025-12-06  
**Decision Makers:** Dennis Byberg

## Context and Problem Statement

The ACE Group booking platform requires secure storage and management of sensitive configuration values such as:

- `NEXTAUTH_SECRET`: Used by NextAuth.js to encrypt session tokens
- Database credentials (PostgreSQL admin password)
- OAuth client secrets (Google, GitHub, etc.)
- API keys and other sensitive configuration

Previously, secrets were stored in:

1. **GitHub Secrets:** For CI/CD deployment
2. **Azure App Service Settings:** Hardcoded in Terraform
3. **Local `.env` files:** For development

This approach has security and maintainability issues:

- Secrets scattered across multiple locations
- Difficult to rotate secrets without updating Terraform and GitHub
- No audit logging of secret access
- Secrets visible in Terraform state files
- No centralized secrets management

## Decision Drivers

- **Security:** Secrets must be encrypted at rest and in transit
- **Centralization:** Single source of truth for all secrets
- **Access control:** Fine-grained permissions for who can read/write secrets
- **Audit logging:** Track when secrets are accessed
- **Integration:** Native integration with Azure App Service
- **Rotation:** Easy secret rotation without redeploying infrastructure
- **Separation of concerns:** Secrets separate from application configuration

## Considered Alternatives

### Alternative 1: Azure Key Vault

- **Pros:**
  - Native Azure integration with App Service
  - Secrets can be referenced via `@Microsoft.KeyVault(SecretUri=...)`
  - Automatic secret rotation support
  - Audit logging and access policies
  - Encryption at rest and in transit
  - Managed service (no maintenance)
  - Free tier available (25,000 transactions/month)
  - Terraform-friendly
- **Cons:**
  - Additional Azure resource to manage
  - Slightly more complex Terraform configuration
  - Requires Managed Identity setup for App Services

### Alternative 2: GitHub Secrets Only

- **Pros:**
  - Already in use
  - No additional infrastructure
  - Simple setup
- **Cons:**
  - Not accessible from Azure App Service at runtime
  - Secrets must be set as environment variables during deployment
  - No audit logging
  - Difficult to rotate secrets
  - Not a centralized solution

### Alternative 3: Hardcoded in Terraform

- **Pros:**
  - Simple configuration
  - Secrets in one place (terraform.tfvars)
- **Cons:**
  - **MAJOR SECURITY RISK:** Secrets visible in Terraform state files
  - State files often stored in version control or cloud storage
  - No encryption at rest
  - No access control or audit logging
  - Violates security best practices

### Alternative 4: HashiCorp Vault

- **Pros:**
  - Industry-standard secrets management
  - Multi-cloud support
  - Advanced features (dynamic secrets, leasing)
- **Cons:**
  - Additional infrastructure to host and maintain
  - Higher operational complexity
  - Cost of running Vault server
  - Overkill for current project needs

## Decision

**Chosen Alternative:** Azure Key Vault

We will use Azure Key Vault to store all production secrets for the following reasons:

1. **Native Azure integration:** App Services can reference secrets directly via `@Microsoft.KeyVault(SecretUri=...)`
2. **Security:** Encryption at rest/transit, RBAC policies, audit logging
3. **Simple rotation:** Update secret in Key Vault without redeploying apps
4. **Cost-effective:** Free tier sufficient for this project
5. **Best practice:** Industry-standard approach for Azure workloads

**Implementation approach:**

- Create `azurerm_key_vault` resource in Terraform
- Store `NEXTAUTH_SECRET` as Key Vault secret
- Grant App Services read access via Managed Identity
- Reference secrets in App Service settings using `@Microsoft.KeyVault(SecretUri=...)`
- Use separate access policies for backend, frontend, and Terraform user

**Secrets to migrate:**

- ✅ `NEXTAUTH_SECRET` (immediate)
- 🔄 Database password (future)
- 🔄 OAuth client secrets (when migrating to Google OAuth)

## Consequences

### Positive Consequences

- ✅ Centralized, secure secrets management
- ✅ No secrets in Terraform state files
- ✅ Easy secret rotation without redeployment
- ✅ Audit logging of secret access
- ✅ Fine-grained access control via RBAC
- ✅ Automatic integration with App Services
- ✅ Encryption at rest and in transit
- ✅ Follows Azure security best practices

### Negative Consequences

- ❌ Additional Azure resource to manage ($0 for free tier, up to ~$0.03/10k operations)
- ❌ More complex Terraform configuration (access policies, managed identities)
- ❌ Initial migration effort to move secrets to Key Vault
- ❌ Requires understanding of Key Vault concepts and access policies

### Neutral Consequences

- 🔄 Terraform complexity increases slightly
- 🔄 App Services use Managed Identity for Key Vault access
- 🔄 Secrets no longer visible in Terraform outputs
- 🔄 Local development still uses `.env` files (Key Vault not needed)

## Implementation Details

**Terraform resources created:**

```hcl
# Key Vault
resource "azurerm_key_vault" "main"

# Secrets
resource "azurerm_key_vault_secret" "nextauth_secret"

# Access Policies
resource "azurerm_key_vault_access_policy" "backend"
resource "azurerm_key_vault_access_policy" "frontend"
```

**App Service reference example:**

```hcl
app_settings = {
  "NEXTAUTH_SECRET" = "@Microsoft.KeyVault(SecretUri=${azurerm_key_vault_secret.nextauth_secret.id})"
}
```

**Access policy permissions:**

- **App Services:** `Get`, `List` (read-only)
- **Terraform user:** `Get`, `List`, `Set`, `Delete`, `Purge`, `Recover` (full management)

## Related Decisions

- **ADR-024:** NextAuth.js for Authentication (requires NEXTAUTH_SECRET)
- **ADR-021:** Terraform for Infrastructure as Code (manages Key Vault)
- **ADR-023:** Azure App Service (uses Managed Identity to access Key Vault)

## References

- [Azure Key Vault Documentation](https://learn.microsoft.com/en-us/azure/key-vault/)
- [App Service Key Vault References](https://learn.microsoft.com/en-us/azure/app-service/app-service-key-vault-references)
- [Terraform Azure Key Vault](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/key_vault)
