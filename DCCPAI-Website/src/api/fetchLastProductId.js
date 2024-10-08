import axios from 'axios';

const fetchLastProductId = async () => {
    try {
        const response = await axios.get('http://localhost/getLastProductId.php');
        return response.data;
    } catch (error) {
        console.error('Error fetching last product ID:', error);
        throw error;
    }
};

export default fetchLastProductId;
