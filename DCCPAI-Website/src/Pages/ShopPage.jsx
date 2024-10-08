import React, { useState, useEffect } from 'react';
import NavBar from '../PageSections/NavBar/NavBar.jsx';
import Footer from '../PageSections/Footer/Footer.jsx';
import StoreTitleSection from '../PageSections/StoreTitleSection/StoreTitleSection.jsx';
import StoreBodySection from '../PageSections/StoreBodySection/StoreBodySection.jsx';
import ProductCardPanel from '../ProductCardPanel/ProductCardPanel.jsx';
import AddButton from '../AddButton/AddButton.jsx';
import ShoppingCart from '../ShoppingCart/ShoppingCart.jsx';


function ShopPage() {
    useEffect(() => {
        document.title = 'DCCPAI - Shop'; // Change this text as needed
    }, []);


    // Use State to manage the visibility of the ProductCardPanel & Access Button
    const [isPanelVisible, setIsPanelVisible] = useState(false);
    const [canAccessAddButton, setCanAccessAddButton] = useState(false);

    // Function to show the Addpanel
    // Open by using the AddButton jsx
    const showPanel = () => {
        setIsPanelVisible(true);
    };

    // Function to hide the panel
    // Only way to hide is to go the ProductCardPanel and click
    // X or Cancel Button
    const hidePanel = () => {
        setIsPanelVisible(false);
    };

    // Use adminState from localStorage and set the Access of the Add button
    useEffect(() => {
        const adminState = localStorage.getItem('adminState');
        if (adminState && (parseInt(adminState, 10) === 0 || parseInt(adminState, 10) === 1)) {
            setCanAccessAddButton(true);
        } else {
            setCanAccessAddButton(false);
        }
    }, []);

    return (
        <>
            <NavBar />
            <StoreTitleSection />
            <StoreBodySection />
            <Footer /> 
            <ShoppingCart/>
            
            {isPanelVisible && (
                <div className="popupOverlay">
                    <ProductCardPanel onClose={hidePanel} />
                </div>
            )}

            {canAccessAddButton && <AddButton onClick={showPanel} props={ "+" } />}
        </>
    );
}

export default ShopPage;
