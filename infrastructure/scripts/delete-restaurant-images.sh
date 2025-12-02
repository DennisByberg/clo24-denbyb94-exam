#!/bin/bash

# Deletes all restaurant images from Azure Blob Storage

STORAGE_ACCOUNT_NAME="${STORAGE_ACCOUNT_NAME:-acegroupstorage}"

az storage blob delete-batch \
  --account-name "$STORAGE_ACCOUNT_NAME" \
  --source restaurant-images \
  --pattern "restaurant-*.jpeg" \
  --auth-mode login
