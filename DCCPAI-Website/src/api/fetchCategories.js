import axios from 'axios';

const fetchCategories = async () => {
    try {
        const response = await axios.get('http://localhost/getCategories.php');
        return response.data.categories; // Return only the categories array
    } catch (error) {
        console.error('There was an error fetching the categories!', error);
        throw error;
    }
};

export default fetchCategories;
