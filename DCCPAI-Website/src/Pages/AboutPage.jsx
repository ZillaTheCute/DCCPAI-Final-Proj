import NavBar from '../PageSections/NavBar/NavBar.jsx'
import Footer from '../PageSections/Footer/Footer.jsx'
import AboutTitleSection from '../PageSections/AboutTitleSection/AboutTitleSection.jsx'
import AboutBodySection from '../PageSections/AboutBodySection/AboutBodySection.jsx'
import React, { useEffect } from 'react';

function AboutPage() {

    useEffect(() => {
        document.title = 'DCCPAI - About Us'; // Change this text as needed
    }, []);

    return (
        <>
        <NavBar />
        <AboutTitleSection />
        <AboutBodySection />
        <Footer /> 
        </>
    )
}

export default AboutPage