// src/api/updateProduct.js

export const updateProduct = async (updatedProduct) => {
    try {
        const response = await fetch('http://localhost/updateProduct.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });

        const textResponse = await response.text();

        try {
            const data = JSON.parse(textResponse);
            if (data.success) {
                return { success: true, data: updatedProduct };
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
