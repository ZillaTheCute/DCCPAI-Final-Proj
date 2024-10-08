import axios from 'axios';

const checkOwnership = async (ownerId, productId) => {
    try {
        const response = await axios.get('http://localhost/checkOwnership.php', {
            params: { owner_id: ownerId, product_id: productId }
        });
        if (response.data.success) {
            return response.data.ownsProduct;
        } else {
            console.error('Error checking ownership:', response.data.message);
            return false; // In case of error, return false as default
        }
    } catch (error) {
        console.error('There was an error checking ownership!', error);
        return false; // Return false in case of any request failure
    }
};

export default checkOwnership;
