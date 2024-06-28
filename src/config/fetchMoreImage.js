import client from './appwrite_config';
import { Storage, ID, Query } from 'appwrite';


const storage = new Storage(client);


export async function fetchMoreImagesFromAppwrite(cursor) {



  try {
    console.log(cursor)
    const response = await storage.listFiles(
      '66757aad001209759337',
      [
        Query.limit(10),
        Query.cursorAfter(cursor)
      ]
    );
    const images = response.files.filter((file) => file.mimeType.startsWith('image/')) // Filter for images
    const ids = images.map(item => item);
    console.log(ids)
    return {
      ids
    };
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}
