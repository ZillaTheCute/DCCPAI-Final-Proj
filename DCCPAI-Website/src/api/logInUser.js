// src/api/logInUser.js

const loginUser = async ({ username, password }) => {
    try {
        const response = await fetch('http://localhost/loginUser.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        console.log('loginUser response data:', data);
        return data;
    } catch (error) {
        console.error('loginUser error:', error);
        return { success: false, message: 'Login failed' };
    }
};

export default loginUser;
