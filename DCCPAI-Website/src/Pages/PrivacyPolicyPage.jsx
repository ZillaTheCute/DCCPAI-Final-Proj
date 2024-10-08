import NavBar from '../PageSections/NavBar/NavBar.jsx'
import Footer from '../PageSections/Footer/Footer.jsx'
import PrivacyPolicyTitleSection from '../PageSections/PrivacyPolicyTitleSection/PrivacyPolicyTitleSection.jsx'
import PrivacyPolicyBodySection from '../PageSections/PrivacyPolicyBodySection/PrivacyPolicyBodySection.jsx'
import React, { useEffect } from 'react';

function PrivacyPolicyPage() {

        useEffect(() => {
        document.title = 'DCCPAI - Privacy Policy'; // Change this text as needed
        }, []);
    
    return (
        <>
        <NavBar />  
        <PrivacyPolicyTitleSection />    
        <PrivacyPolicyBodySection />
        <Footer /> 
        </>
    )
}

export default PrivacyPolicyPage