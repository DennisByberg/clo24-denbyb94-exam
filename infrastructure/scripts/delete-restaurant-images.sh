#!/bin/bash

# Deletes all restaurant images from Azure Blob Storage

az storage blob delete-batch \
  --account-name essgroupstorage \
  --source restaurant-images \
  --pattern "restaurant-*.jpeg" \
  --auth-mode login
