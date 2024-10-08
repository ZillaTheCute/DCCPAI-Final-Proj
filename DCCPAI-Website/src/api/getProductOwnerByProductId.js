import axios from 'axios';

const API_BASE_URL = 'http://localhost'; // Replace with your server's base URL

export const getProductOwnerById = async (productId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getProductOwnerByProductId.php`, {
            params: {
                product_id: productId, // Send product_id as a parameter
            }
        });
        console.log('API Response (Product Owner):', response.data); // Debugging: log the response data
        return response.data; // Return the API response data
    } catch (error) {
        console.error('Error fetching product owner:', error); // Debugging: log the error
        throw new Error('Error fetching product owner');
    }
};
