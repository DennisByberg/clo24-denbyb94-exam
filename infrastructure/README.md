# Infrastructure Documentation

![](../images/ace-group-logo-header.png)

Developer guide for managing infrastructure resources. Contains Terraform configurations for Azure resources and utility scripts.

See the main **[README](../README.md)** for complete tech stack and ADR documentation.

## 📁 Infrastructure Structure

**Note:** _Only the most important directories and files are listed below._

```bash
infrastructure/
├── scripts/              # Utility scripts for resource management
├── terraform/
│   ├── main.tf           # Main Terraform configuration
│   ├── outputs.tf        # Output values
│   ├── variables.tf      # Variable definitions
│   └── terraform.tfvars  # Variable values (not committed)
│
└── README.md             # This file
```

## ☁️ Azure Resources

The Terraform configuration provisions the following Azure resources:

- **Resource Group** - Container for all project resources
- **Storage Account** - Blob storage for restaurant images
- **Storage Container** - Public blob container for restaurant images
- **Role Assignment** - Storage Blob Data Contributor for current user
- **App Service Plan (Backend)** - Linux hosting plan for backend (B1 tier, Python 3.13)
- **App Service (Backend)** - Backend API (FastAPI) with Managed Identity
- **App Service Plan (Frontend)** - Linux hosting plan for frontend (B1 tier, Node.js 20 LTS)
- **App Service (Frontend)** - Frontend application (Next.js) with Managed Identity
- **PostgreSQL Flexible Server** - Database server (version 16, B_Standard_B1ms)
- **PostgreSQL Database** - Application database with UTF8 encoding
- **PostgreSQL Firewall Rule** - Allow Azure services to connect
- **Azure Key Vault** - Secrets management
- **Key Vault Access Policies** - Terraform provider + GitHub Actions Service Principal
- **Key Vault Secrets** - NEXTAUTH_SECRET, DATABASE_URL

## 🛠️ Automation Scripts

**Prerequisites:**

- Azure CLI installed and authenticated
- Terraform installed
- GitHub CLI (`gh`) authenticated

### Deploy Infrastructure

From `clo24-denbyb94-exam/infrastructure/scripts`:

```bash
./deploy-infrastructure.sh
```

**Complete automated deployment:**

1. Terraform init/validate/plan/apply
2. Configure Service Principal permissions (auto-detects github-actions-ace-group)
3. Upload restaurant images to Azure Blob Storage
4. Trigger GitHub Actions workflows (backend + frontend)

### Destroy Infrastructure

From `clo24-denbyb94-exam/infrastructure/scripts`:

```bash
./destroy-infrastructure.sh
```

**Complete automated teardown:**

1. Set Key Vault permissions
2. Purge existing soft-deleted secrets
3. Run `terraform destroy`
4. Purge secrets created during destroy

**Note:** Azure Key Vault deletion takes 5-10 minutes (normal behavior).

## 🔐 GitHub Secrets Setup

Add these in [GitHub Repository Secrets](https://github.com/DennisByberg/clo24-denbyb94-exam/settings/secrets/actions):

**Note:** Working towards migrating all secrets to Azure Key Vault to eliminate GitHub Secrets dependency.

### AZURE_CREDENTIALS

Create Service Principal (run once):

```bash
az ad sp create-for-rbac \
  --name "github-actions-ace-group" \
  --role contributor \
  --scopes /subscriptions/<SUBSCRIPTION_ID>/resourceGroups/rg-ace-group \
  --sdk-auth
```

### NEXT_PUBLIC_API_URL

Get from: `terraform output app_service_url`

### NEXT_PUBLIC_AZURE_BLOB_URL

Get from: `terraform output restaurant_images_container_url`

**Note:** NEXTAUTH_SECRET and DATABASE_URL are managed via Azure Key Vault, not GitHub Secrets.

## ⚙️ Configuration

Terraform variables are configured in `terraform/terraform.tfvars`. See `terraform/variables.tf` for available configuration options.
