const { BlobServiceClient } = require('@azure/storage-blob');

const uploadToAzure = async (buffer, fileName) => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING
  );
  const containerClient = blobServiceClient.getContainerClient(
    process.env.AZURE_CONTAINER_NAME
  );
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);

  await blockBlobClient.uploadData(buffer, {
    blobHTTPHeaders: { blobContentType: "image/jpeg" },
    overwrite: true,
  });
  return blockBlobClient.url;
};

const deleteFromAzure = async (fileUrl, folderPath) => {
  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_STORAGE_CONNECTION_STRING
    );
    const containerClient = blobServiceClient.getContainerClient(
      process.env.AZURE_CONTAINER_NAME
    );

    // Extract blob name from URL
    const url = new URL(fileUrl);
    const blobName = decodeURIComponent(folderPath ? folderPath + url.pathname.split("/").pop() : url.pathname.split("/").pop());

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.deleteIfExists();

    return { success: true, message: "Image deleted successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

module.exports = { uploadToAzure, deleteFromAzure };