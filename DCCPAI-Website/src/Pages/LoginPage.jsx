import React, { useEffect } from 'react';
import LoginSection from '../PageSections/LoginSection/LoginSection.jsx';

const LoginPage = () => {

    useEffect(() => {
        document.title = 'DCCPAI - Login'; // Change this text as needed
    }, []); 
    //If User is Login returns to Home Page
    useEffect(() => {
        const isAdmin = localStorage.getItem('adminState') === 'true';
        console.log(`Admin state on page load: ${isAdmin}`);
    }, []);

    return (
        <div>
            <LoginSection />
        </div>
    );
};

export default LoginPage;