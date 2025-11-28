# Appwrite Storage Utility

This utility handles image uploads to Appwrite Cloud Storage for review images.

## Configuration

- **Endpoint**: `https://nyc.cloud.appwrite.io/v1`
- **Project ID**: `6929b882000541f3fa0a`
- **Bucket ID**: `6929b8b0001733667978`

## Functions

### `uploadReviewImage(file, recipeId)`

Uploads a review image to Appwrite Storage with a custom filename.

**Parameters:**
- `file` (File): The image file to upload
- `recipeId` (string|number): The recipe ID for naming the file

**Returns:**
- `Promise<string>`: URL of the uploaded image

**Filename Format:**
- `review_{recipeId}_{timestamp}.{extension}`
- Example: `review_123_1701234567890.jpg`

**Usage:**
```javascript
import { uploadReviewImage } from '../utils/appwriteStorage';

const imageUrl = await uploadReviewImage(file, recipeId);
```

### `deleteImage(fileId)`

Deletes an image from Appwrite Storage.

**Parameters:**
- `fileId` (string): The Appwrite file ID to delete

**Returns:**
- `Promise<boolean>`: True if successful

**Usage:**
```javascript
import { deleteImage } from '../utils/appwriteStorage';

await deleteImage(fileId);
```

## Error Handling

Both functions throw errors that should be caught and handled appropriately in your components.
