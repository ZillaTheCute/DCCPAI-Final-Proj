import axios from 'axios';

const checkUsername = async (user) => {
    try {
        const response = await axios.post('http://localhost/checkUsername.php', user);
        return response.data;
    } catch (error) {
        console.error('There was an error!', error);
        throw error;
    }
};

export default checkUsername;
