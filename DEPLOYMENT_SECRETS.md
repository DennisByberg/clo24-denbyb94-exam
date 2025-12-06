# GitHub Secrets Setup för Deployment

## Azure Service Principal (PERMANENT - skapas EN gång)

### AZURE_CREDENTIALS

Skapa Service Principal med Azure CLI:

```bash
az ad sp create-for-rbac \
  --name "github-actions-ace-group" \
  --role contributor \
  --scopes /subscriptions/f21d1b11-04da-4e47-b735-5e29e4ae4661/resourceGroups/rg-ace-group \
  --sdk-auth
```

Kopiera **hela JSON-outputen** och lägg till som GitHub Secret.

**Fördel:** Denna credential ändras INTE när du kör `terraform destroy/apply`.

---

## Frontend Secrets

### NEXT_PUBLIC_API_URL

```
https://app-ace-group-backend.azurewebsites.net
```

_Källa: `terraform output app_service_url`_

### NEXT_PUBLIC_AZURE_BLOB_URL

```
https://acegroupstorage.blob.core.windows.net/restaurant-images/
```

_Källa: `terraform output restaurant_images_container_url`_

---

## Lägg till i GitHub

1. Gå till: https://github.com/DennisByberg/clo24-denbyb94-exam/settings/secrets/actions
2. Klicka "New repository secret"
3. Lägg till endast: `AZURE_CREDENTIALS`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_AZURE_BLOB_URL`

---

## Secrets hanterade via Azure Key Vault

### NEXTAUTH_SECRET

**Key Vault secret:** `nextauth-secret`  
**Används av:** Frontend & Backend via Managed Identity

### DATABASE_URL

**Key Vault secret:** `database-url`  
**Används av:**

- Backend runtime (via Managed Identity + Key Vault reference)
- GitHub Actions migrations (hämtas med Azure CLI under deployment)

**Ingen GitHub Secret behövs!** Workflow hämtar värdet direkt från Key Vault:

```yaml
- name: Get Database URL from Key Vault
  run: |
    DATABASE_URL=$(az keyvault secret show --name database-url --vault-name kv-ace-group --query value -o tsv)
```

---

## Sammanfattning

| Secret                       | Var lagras      | Används av                |
| ---------------------------- | --------------- | ------------------------- |
| `AZURE_CREDENTIALS`          | GitHub Secrets  | GitHub Actions deployment |
| `NEXT_PUBLIC_API_URL`        | GitHub Secrets  | Frontend build (public)   |
| `NEXT_PUBLIC_AZURE_BLOB_URL` | GitHub Secrets  | Frontend build (public)   |
| `DATABASE_URL`               | Azure Key Vault | Backend + Migrations      |
| `NEXTAUTH_SECRET`            | Azure Key Vault | Frontend + Backend        |
