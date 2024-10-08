import axios from 'axios';

const addCategory = async (categoryData) => {
    try {
        const response = await axios.post('http://localhost/manageCategory.php', categoryData);
        return response.data;
    } catch (error) {
        console.error('There was an error adding the category!', error);
        throw error;
    }
};

export default addCategory;
