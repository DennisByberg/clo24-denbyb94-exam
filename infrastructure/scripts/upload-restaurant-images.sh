#!/bin/bash

# Uploads all restaurant images to Azure Blob Storage
# Usage: STORAGE_ACCOUNT_NAME=essgroupstorage ./upload-restaurant-images.sh

STORAGE_ACCOUNT_NAME="${STORAGE_ACCOUNT_NAME:-essgroupstorage}"

az storage blob upload-batch \
  --account-name "$STORAGE_ACCOUNT_NAME" \
  --destination restaurant-images \
  --source "../images/restaurant" \
  --pattern "restaurant-*.jpeg" \
  --auth-mode login \
  --overwrite
