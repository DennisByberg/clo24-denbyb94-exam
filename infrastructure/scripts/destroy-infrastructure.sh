#!/bin/bash

# Destroy all Azure infrastructure
# Handles Azure Key Vault soft delete by purging secrets before and after terraform destroy

VAULT_NAME="kv-ace-group"

# Step 1: Set Key Vault permissions
echo "Step 1: Setting Key Vault permissions..."
USER_ID=$(az ad signed-in-user show --query id -o tsv)
az keyvault set-policy --name "$VAULT_NAME" --object-id "$USER_ID" \
  --secret-permissions get list delete purge recover set

echo "Permissions set"

# Step 2: Purge existing soft-deleted secrets
echo "Step 2: Purging existing soft-deleted secrets..."
SECRETS=$(az keyvault secret list-deleted --vault-name "$VAULT_NAME" --query "[].name" -o tsv)

if [ -n "$SECRETS" ]; then
    echo "Found secrets to purge:"
    while IFS= read -r secret; do
        if [ -n "$secret" ]; then
            echo "  - $secret"
            az keyvault secret purge --vault-name "$VAULT_NAME" --name "$secret"
        fi
    done <<< "$SECRETS"
    echo "Secrets purged"
else
    echo "No soft-deleted secrets found"
fi

# Step 3: Run Terraform destroy
echo "Step 3: Running Terraform destroy..."
cd ../terraform
terraform destroy -auto-approve

# Step 4: Purge secrets created during destroy
echo "Step 4: Purging secrets from destroy process..."
SECRETS=$(az keyvault secret list-deleted --vault-name "$VAULT_NAME" --query "[].name" -o tsv)

if [ -n "$SECRETS" ]; then
    while IFS= read -r secret; do
        if [ -n "$secret" ]; then
            echo "  - $secret"
            az keyvault secret purge --vault-name "$VAULT_NAME" --name "$secret"
        fi
    done <<< "$SECRETS"
    echo "Secrets purged"
else
    echo "No secrets to purge"
fi

echo "Infrastructure destroyed successfully"
