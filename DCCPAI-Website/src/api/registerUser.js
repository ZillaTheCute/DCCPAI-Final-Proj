// src/registerUser.js

import axios from 'axios';

const registerUser = async (user) => {
    try {
        const response = await axios.post('http://localhost/registerUser.php', user);
        return response.data;
    } catch (error) {
        console.error('There was an error!', error);
        throw error;
    }
};

export default registerUser;
