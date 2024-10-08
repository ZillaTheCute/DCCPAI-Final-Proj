import axios from 'axios';

const API_BASE_URL = 'http://localhost';

export const getProductOwners = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getProductOwners.php`);
        console.log('API Response (Product Owners):', response.data); // Debugging: log the response data
        return response.data;
    } catch (error) {
        console.error('Error fetching product owners:', error); // Debugging: log the error
        throw new Error('Error fetching product owners');
    }
};
