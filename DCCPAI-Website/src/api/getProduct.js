import axios from 'axios';

const API_BASE_URL = 'http://localhost';

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getProducts.php`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching products');
    }
};
