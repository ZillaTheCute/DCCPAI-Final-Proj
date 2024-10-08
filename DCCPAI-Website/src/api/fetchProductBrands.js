import axios from 'axios';

const fetchProductBrands = async () => {
    try {
        const response = await axios.get('http://localhost/getProductBrands.php');  // Call the new API
        return response.data.brands;  // Return only the brand-product relationship array
    } catch (error) {
        console.error('There was an error fetching the brand-product relationships!', error);
        throw error;
    }
};

export default fetchProductBrands;
