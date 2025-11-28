import axios from 'axios';

// Fetch posts data from the API
export const getPosts = async () => {
  try {
    const response = await axios.get('/api/recipes');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};
  