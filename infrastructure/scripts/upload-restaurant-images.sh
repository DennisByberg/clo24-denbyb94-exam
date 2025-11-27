#!/bin/bash

# Uploads all restaurant images to Azure Blob Storage

az storage blob upload-batch \
  --account-name essgroupstorage \
  --destination restaurant-images \
  --source "../images/restaurant" \
  --pattern "restaurant-*.jpeg" \
  --auth-mode login \
  --overwrite
