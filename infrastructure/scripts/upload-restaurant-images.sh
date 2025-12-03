#!/bin/bash

# Uploads all restaurant images to Azure Blob Storage

STORAGE_ACCOUNT_NAME="${STORAGE_ACCOUNT_NAME:-acegroupstorage}"

az storage blob upload-batch \
  --account-name "$STORAGE_ACCOUNT_NAME" \
  --destination restaurant-images \
  --source "../images/restaurant" \
  --pattern "restaurant-*.jpeg" \
  --auth-mode login \
  --overwrite
