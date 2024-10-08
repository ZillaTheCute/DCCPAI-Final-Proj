import axios from 'axios';

const fetchBrands = async () => {
    try {
        const response = await axios.get('http://localhost/getBrands.php');
        return response.data.brands; // Return only the brands array
    } catch (error) {
        console.error('There was an error fetching the brands!', error);
        throw error;
    }
};

export default fetchBrands;
