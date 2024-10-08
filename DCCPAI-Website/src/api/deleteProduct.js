// src/api/deleteProduct.js

export const deleteProduct = async (productId) => {
    try {
        const response = await fetch('http://localhost/deleteProduct.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product_id: productId }),
        });

        const textResponse = await response.text();

        try {
            const data = JSON.parse(textResponse);
            if (data.success) {
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (jsonError) {
            return { success: false, message: 'Invalid JSON response: ' + textResponse };
        }
    } catch (error) {
        return { success: false, message: 'Network error: ' + error.message };
    }
};
