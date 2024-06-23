import client from './config/appwrite_config';

export async function fetchImagesFromAppwrite(cursor = undefined) {
    
    const params = {
      limit: 10, 
      cursor,
    };
  
    try {
      const response = await client.storage.listFiles('your-bucket-id', params);
      const images = response.documents.filter((file) => file.mimeType.startsWith('image/')) // Filter for images
        .map((item) => ({ src: item.url || 'Image' })); 
  
      return {
        images,
        nextCursor: response.cursor, 
      };
    } catch (error) {
      console.error('Error fetching images:', error);
      return [];
    }
  }
  