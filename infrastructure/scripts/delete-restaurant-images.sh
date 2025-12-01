#!/bin/bash

# Deletes all restaurant images from Azure Blob Storage
# Usage: STORAGE_ACCOUNT_NAME=essgroupstorage ./delete-restaurant-images.sh

STORAGE_ACCOUNT_NAME="${STORAGE_ACCOUNT_NAME:-essgroupstorage}"

az storage blob delete-batch \
  --account-name "$STORAGE_ACCOUNT_NAME" \
  --source restaurant-images \
  --pattern "restaurant-*.jpeg" \
  --auth-mode login
