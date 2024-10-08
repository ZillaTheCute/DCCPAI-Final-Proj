import React, { useState, useEffect } from 'react';
import styles from '../AccountRegistrationSection/AccountRegistrationSection.module.css';
import TextButton from '../../TextButton/TextButton.jsx';
import registerUser from '../../api/registerUser';
import checkUsername from '../../api/checkUsername';
import { getProductOwners } from '../../api/getProductOwners.js';
import { saveProductOwner } from '../../api/saveProductOwner.js';

const AccountRegistrationSection = () => {
    // Use States
    const [user, setUser] = useState({
        username: '',
        owner_id: '',
        owner_name: '', // Added field for owner name
        password: '',
        confirmPassword: '',
        personnelLevel: ''
    });
    const [productOwners, setProductOwners] = useState([]);
    const [error, setError] = useState('');
    const [isNewOwner, setIsNewOwner] = useState(false); // Track if a new owner is being entered

    // Personel Level for Database Purposes
    const personnelLevel = [
        { value: '1', label: 'Member' },
        { value: '2', label: 'Staff' },
    ];

    // Retrieve ProductOwners
    useEffect(() => {
        const fetchProductOwners = async () => {
            try {
                const data = await getProductOwners();
                if (data.success) {
                    setProductOwners(data.owners);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                setError('Error fetching product owners');
            }
        };

        fetchProductOwners();
    }, []);

    
    // Use for handling Inputs
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'owner_id') {
            if (value === 'new') {
                setIsNewOwner(true);
                setUser({ ...user, owner_id: '', owner_name: '' });
            } else {
                setIsNewOwner(false);
                const selectedOwner = productOwners.find(
                    (owner) => owner.product_owner_id === value
                );
                setUser({
                    ...user,
                    owner_id: value,
                    owner_name: selectedOwner ? selectedOwner.product_owner_name : ''
                });
            }
        } else {
            setUser({ ...user, [name]: value });
        }

        console.log(`Updated ${name}:`, value); // Debugging: log the updated input
    };



    // Submitting Form
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Form Submission Attempt:', user); // Debugging: log the current state before submission

        if (user.password !== user.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        // Check existing Username
        try {
            const usernameCheck = await checkUsername({ username: user.username });
            console.log('Username Check Response:', usernameCheck); // Debugging: log the username check response

            if (!usernameCheck.success) {
                alert(usernameCheck.message);
                return;
            }

            // Automatically generate a new Owner ID in the backend if needed
            let ownerId = user.owner_id;
            if (isNewOwner) {
                const ownerResponse = await saveProductOwner({
                    product_owner_id: '', // Empty string to indicate a new ID should be generated
                    product_owner_name: user.owner_name,
                });
                console.log('Owner Save/Check Response:', ownerResponse); // Debugging: log the owner save/check response

                if (!ownerResponse.success) {
                    alert('Failed to save Owner ID: ' + ownerResponse.message);
                    return;
                }
                ownerId = ownerResponse.product_owner_id;
            }

            const adjustedUser = {
                ...user,
                owner_id: parseInt(ownerId, 10),
                password: user.password
            };

            console.log('Data being submitted:', adjustedUser); // Debugging: log the data being submitted

            const data = await registerUser(adjustedUser);
            console.log('Registration Response:', data); // Debugging: log the registration response

            alert(data.message);
            // Reset the Form
            if (data.success) {
                setUser({
                    username: '',
                    owner_id: '',
                    owner_name: '', // Reset owner_name field as well
                    password: '',
                    confirmPassword: '',
                    personnelLevel: ''
                });
                console.log('Form reset after successful registration'); // Debugging: confirm form reset
                setIsNewOwner(false); // Reset the new owner flag
                window.location.reload();
            }
        } catch (error) {
            alert('Error registering user: ' + (error.response?.data.message || error.message));
            console.error('Registration Error:', error); // Debugging: log the error
        }
    };

    return (
        <div className={styles.registerAccountDiv}>
            <div className={styles.registerAccountContent}>
                <h1>Create an Account</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="owner_id">Owner ID:</label>
                    <select
                        id="owner_id"
                        name="owner_id"
                        value={user.owner_id || (isNewOwner ? 'new' : '')}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select an existing Owner ID or enter a new one</option>
                        {productOwners.map((owner) => (
                            <option key={owner.product_owner_id} value={owner.product_owner_id}>
                                {owner.product_owner_id} - {owner.product_owner_name}
                            </option>
                        ))}
                        <option value="new">Enter a new Owner</option>
                    </select>
                    {isNewOwner && (
                        <>
                            <label htmlFor="owner_name">Owner Name:</label> {/* New input for Owner Name */}
                            <input
                                type="text"
                                id="owner_name"
                                name="owner_name"
                                value={user.owner_name}
                                onChange={handleChange}
                                placeholder="Enter new owner name"
                                required
                            />
                        </>
                    )}
                    <label htmlFor="personnelLevel">Personnel Level:</label>
                    <select
                        id="personnelLevel"
                        name="personnelLevel"
                        value={user.personnelLevel}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a Personnel level...</option>
                        {personnelLevel.map((level) => (
                            <option key={level.value} value={level.value}>
                                {level.label}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <div className={styles.TextButtonPlacement}>
                        <TextButton
                            buttonText="Register Account"
                            className={styles.buttonContainer}
                            isButton={true}
                            
                        />
                    </div>
                </form>
                {error && <p className={styles.errorMessage}>{error}</p>}
            </div>
        </div>
    );
};

export default AccountRegistrationSection;
