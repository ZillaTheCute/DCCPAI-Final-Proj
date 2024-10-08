import AccountRegistrationSection from '../PageSections/AccountRegistrationSection/AccountRegistrationSection.jsx'
import React, { useEffect } from 'react';
import NavBar from '../PageSections/NavBar/NavBar.jsx';
import Footer from '../PageSections/Footer/Footer.jsx';

function AccountRegistrationPage() {

    useEffect(() => {
    document.title = 'DCCPAI - Account Registration'; // Change this text as needed
  }, []); 

  return (
    <>
      <NavBar/>
      <AccountRegistrationSection />
      <Footer/>
    </>
  );
    
}

export default AccountRegistrationPage
