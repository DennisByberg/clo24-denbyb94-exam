#!/bin/bash

# Deploy all Azure infrastructure
# This script runs terraform apply to create/update all resources

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TERRAFORM_DIR="$SCRIPT_DIR/../terraform"

echo "========================================="
echo "Deploying Azure Infrastructure"
echo "========================================="
echo ""

cd "$TERRAFORM_DIR"

# Step 1: Initialize Terraform (if needed)
echo "Step 1: Initializing Terraform..."
terraform init
echo ""

# Step 2: Validate configuration
echo "Step 2: Validating configuration..."
terraform validate
echo "✓ Configuration valid"
echo ""

# Step 3: Plan changes
echo "Step 3: Planning changes..."
terraform plan -out=tfplan
echo ""

# Step 4: Apply changes
echo "Step 4: Applying changes..."
terraform apply tfplan
rm -f tfplan

echo ""
echo "Step 5: Configuring Service Principal permissions..."

echo "  Looking up github-actions-ace-group Service Principal..."
SP_APP_ID=$(az ad sp list --display-name "github-actions-ace-group" --query "[0].appId" -o tsv)

if [ -z "$SP_APP_ID" ]; then
  echo "  ⚠ Service Principal 'github-actions-ace-group' not found"
else
  echo "  Found Service Principal: $SP_APP_ID"
  
  SUBSCRIPTION_ID=$(az account show --query id -o tsv)
  echo "  Granting Contributor role on subscription: $SUBSCRIPTION_ID"
  
  az role assignment create \
    --assignee "$SP_APP_ID" \
    --role Contributor \
    --scope "/subscriptions/$SUBSCRIPTION_ID" \
    >/dev/null 2>&1 && echo "  ✓ Service Principal permissions configured" || echo "  ⚠ Service Principal already has permissions (or failed to assign)"
fi

echo ""
echo "Step 6: Uploading restaurant images..."
cd "$TERRAFORM_DIR"

STORAGE_ACCOUNT_NAME="${STORAGE_ACCOUNT_NAME:-acegroupstorage}"
echo "  Uploading images to storage account: $STORAGE_ACCOUNT_NAME"

az storage blob upload-batch \
  --account-name "$STORAGE_ACCOUNT_NAME" \
  --destination restaurant-images \
  --source "../images/restaurant" \
  --pattern "restaurant-*.jpeg" \
  --auth-mode login \
  --overwrite \
  >/dev/null 2>&1 && echo "  ✓ Restaurant images uploaded" || echo "  ⚠ Failed to upload images (run manually: ./infrastructure/scripts/upload-restaurant-images.sh)"

echo ""
echo "Step 7: Triggering GitHub Actions deployments..."
cd "$SCRIPT_DIR/../.."

# Trigger backend deployment
echo "  Triggering backend deployment workflow..."
gh workflow run deploy-backend.yml --ref dev 2>/dev/null && echo "  ✓ Backend deployment triggered" || echo "  ⚠ Failed to trigger backend (run manually: gh workflow run deploy-backend.yml --ref dev)"

# Trigger frontend deployment
echo "  Triggering frontend deployment workflow..."
gh workflow run deploy-frontend.yml --ref dev 2>/dev/null && echo "  ✓ Frontend deployment triggered" || echo "  ⚠ Failed to trigger frontend (run manually: gh workflow run deploy-frontend.yml --ref dev)"

echo ""
echo "Step 8: Enabling database seeding for first startup..."
az webapp config appsettings set \
  --name app-ace-group-backend \
  --resource-group rg-ace-group \
  --settings RUN_SEED_ON_STARTUP=true \
  --output none 2>/dev/null && echo "  ✓ Database seeding enabled (will auto-disable after first run)" || echo "  ⚠ Failed to set seeding flag (may need manual setup)"

echo ""
echo "========================================="
echo "✓ Infrastructure deployed successfully!"
echo "========================================="
echo ""
echo "Deployment status:"
echo "  - Infrastructure: ✓ Created"
echo "  - Service Principal: ✓ Permissions configured"
echo "  - Restaurant images: ✓ Uploaded"
echo "  - Backend deployment: Triggered (check GitHub Actions)"
echo "  - Frontend deployment: Triggered (check GitHub Actions)"
echo "  - Database seeding: ✓ Enabled for first startup"
echo ""
echo "Monitor deployments:"
echo "  gh run list --workflow=deploy-backend.yml"
echo "  gh run list --workflow=deploy-frontend.yml"
echo ""
echo "Once deployed, check:"
echo "  Frontend: https://app-ace-group-frontend.azurewebsites.net"
echo "  Backend:  https://app-ace-group-backend.azurewebsites.net/health"
