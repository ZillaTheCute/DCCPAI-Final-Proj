import NavBar from '../PageSections/NavBar/NavBar.jsx'
import React, { useEffect } from 'react';
import Footer from '../PageSections/Footer/Footer.jsx'
import HeroTitleSection2 from '../PageSections/HeroTitleSection2/HeroTitleSection2.jsx'
import OurCacaoSection from '../PageSections/OurCacaoSection/OurCacaoSection.jsx'
import WhoWeAreSection2 from '../PageSections/WhoWeAreSection2/WhoWeAreSection2.jsx'
import ShoppingCart from '../ShoppingCart/ShoppingCart.jsx'

function LandingPage() {

    useEffect(() => {
        document.title = 'Welcome to DCCPAI!'; // Change this text as needed
    }, []); // Empty dependency array means this runs once when the component mounts

    return (
        <>
        <NavBar />
        <HeroTitleSection2 />
        <OurCacaoSection />
        <WhoWeAreSection2 /> 
        <Footer /> 
        <ShoppingCart/>
        </>
    )
}

export default LandingPage