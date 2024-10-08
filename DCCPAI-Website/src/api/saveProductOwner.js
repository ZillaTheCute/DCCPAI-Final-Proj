import axios from 'axios';

const API_BASE_URL = 'http://localhost';

export const saveProductOwner = async ({ product_owner_id, product_owner_name }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/saveProductOwner.php`, {
            product_owner_id,
            product_owner_name,
        });
        console.log('API Response (Save Product Owner):', response.data); // Debugging: log the response data
        return response.data;
    } catch (error) {
        console.error('Error saving product owner:', error); // Debugging: log the error
        throw new Error('Error saving product owner');
    }
};
