import { Client, Storage, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject('6929b882000541f3fa0a');

const storage = new Storage(client);

const BUCKET_ID = '6929b8b0001733667978';

/**
 * Upload an image to Appwrite Storage
 * @param {File} file - The file to upload
 * @param {string|number} recipeId - Recipe ID for naming
 * @returns {Promise<string>} - URL of the uploaded image
 */
export const uploadReviewImage = async (file, recipeId) => {
    if (!file) {
        throw new Error('No file provided');
    }

    try {
        // Generate unique filename using recipe ID and timestamp
        const timestamp = Date.now();
        const fileExtension = file.name.split('.').pop();
        const customFileName = `review_${recipeId}_${timestamp}.${fileExtension}`;
        
        // Create a new File object with the custom name
        const renamedFile = new File([file], customFileName, { type: file.type });

        // Upload to Appwrite
        const response = await storage.createFile(
            BUCKET_ID,
            ID.unique(),
            renamedFile
        );

        // Generate public URL for the uploaded file
        const fileUrl = `https://nyc.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${response.$id}/view?project=6929b882000541f3fa0a`;

        return fileUrl;
    } catch (error) {
        console.error('Error uploading image to Appwrite:', error);
        throw error;
    }
};

/**
 * Delete an image from Appwrite Storage
 * @param {string} fileId - The file ID to delete
 */
export const deleteImage = async (fileId) => {
    try {
        await storage.deleteFile(BUCKET_ID, fileId);
        return true;
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
};
