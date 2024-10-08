
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../LoginSection/LoginSection.module.css';
import TextButton from '../../TextButton/TextButton.jsx';

// API's
import loginUser from '../../api/logInUser.js';
import userProducts from '../../api/userProducts';

function LoginSection() {
    // Use States
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Handle Submit Login
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form', { username, password });

        try {
            const response = await loginUser({ username, password });
            if (response.success) {
                alert('Login successful. Welcome User');
                localStorage.setItem('authToken', true);
                localStorage.setItem('adminState', response.user_access);

                const ownerResponse = await userProducts({ username, password });
                if (ownerResponse.success) {
                    alert('User Owner ID: ' + ownerResponse.owner_id);
                    localStorage.setItem('owner', ownerResponse.owner_id);
                    window.location.reload(true);
                } else {
                    alert('Failed to fetch owner ID: ' + ownerResponse.message);
                }

                navigate('/');
            } else {
                alert('Login failed: ' + response.message)
                alertsetErrorMessage('Login failed: ' + response.message);
            }
        } catch (error) {
            setErrorMessage('An error occurred during login.');
        }
    };

    return (
        <div className={styles.loginSectionDiv}>
            <div className={styles.loginContainer}>
                <h1>Login</h1>
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                    />
                    
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />

                    <div className={styles.TextButtonPlacement}>
                        <TextButton 
                            buttonText="Login" 
                            isButton={true}  // This makes the button a submit button
                            className={styles.buttonContainer}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginSection;
