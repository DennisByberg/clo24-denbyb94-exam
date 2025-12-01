/**
 * Constructs image URL from Azure Blob Storage with local fallback
 * @param imagePath - Relative path to image in blob storage (e.g., 'restaurant-hero.jpeg')
 * @returns Full Azure Blob Storage URL or '/placeholder.jpg' if environment variable not set
 */
export const getImageUrl = (imagePath: string): string => {
  const azureBlobUrl = process.env.NEXT_PUBLIC_AZURE_BLOB_URL;

  if (!azureBlobUrl) {
    return '/placeholder.jpg';
  }

  return `${azureBlobUrl}/${imagePath}`;
};
