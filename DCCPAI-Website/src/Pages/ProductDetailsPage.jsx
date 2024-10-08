// import React, { useState, useEffect } from 'react';
// import NavBar from '../PageSections/NavBar/NavBar.jsx';
// import Footer from '../PageSections/Footer/Footer.jsx';
// import ProductDetailsBodySection from '../PageSections/ProductDetailsBodySection/ProductDetailsBodySection.jsx';
// import ShoppingCart from '../ShoppingCart/ShoppingCart.jsx';
// import AddButton from '../AddButton/AddButton.jsx';
// import EditProductPanel from '../EditProductPanel/EditProductPanel.jsx';
// import checkOwnership from '../api/checkOwnership.js'; // Import checkOwnership function


// function ProductDetailsPage() {

//     useEffect(() => {
//         document.title = `Product Details`; // Change this text as needed
//     }, []);

//     const [isPanelVisible, setIsPanelVisible] = useState(false);
//     const [canAccessAddButton, setCanAccessAddButton] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [ownsProduct, setOwnsProduct] = useState(null);

//     // Function to show the edit panel and check product ownership
//     const showPanel = async () => {
//         const storedProduct = localStorage.getItem('clickedProduct');
//         const ownerId = localStorage.getItem('owner'); // Retrieve owner_id from localStorage

//         if (storedProduct && ownerId) {
//             const product = JSON.parse(storedProduct);

//             // Check ownership using the imported API function
//             const ownershipStatus = await checkOwnership(ownerId, product.id || product.product_id);
//             setOwnsProduct(ownershipStatus);

//             setSelectedProduct(product);
//         } else {
//             setSelectedProduct({ id: '', name: '', price: '', description: '', available: false, display: false });
//         }
//         setIsPanelVisible(true);
//     };

//     // Function to hide the panel
//     const hidePanel = () => {
//         setIsPanelVisible(false);
//         setSelectedProduct(null);
//     };

//     // Handle saving product
//     const handleSave = (updatedProduct) => {
//         localStorage.setItem(`product_${updatedProduct.id || updatedProduct.product_id}`, JSON.stringify(updatedProduct));
//         localStorage.setItem('clickedProduct', JSON.stringify(updatedProduct)); // Update the clicked product as well
//         hidePanel();
//     };

//     // Handle deleting product
//     const handleDelete = (productId) => {
//         localStorage.removeItem(`product_${productId}`);
//         localStorage.removeItem('clickedProduct'); // Remove the clicked product as well
//         hidePanel();
//     };

//     // useEffect to handle adminState and ownership status
//     useEffect(() => {
//         const checkAccess = async () => {
//             const adminState = localStorage.getItem('adminState');
//             const ownerId = localStorage.getItem('owner');
//             const storedProduct = localStorage.getItem('clickedProduct');

//             if (storedProduct && ownerId) {
//                 const product = JSON.parse(storedProduct);

//                 const ownershipStatus = await checkOwnership(ownerId, product.id || product.product_id);
//                 setOwnsProduct(ownershipStatus);

//                 if (adminState && (parseInt(adminState, 10) === 0 || parseInt(adminState, 10) === 1 && ownershipStatus)) {
//                     setCanAccessAddButton(true);
//                 } else {
//                     setCanAccessAddButton(false);
//                 }
//             } else {
//                 setCanAccessAddButton(false);
//             }
//         };

//         checkAccess();
//     }, []);

//     return (
//         <>
//             <NavBar />
//             <ProductDetailsBodySection />
//             <Footer />
//             <ShoppingCart initialOpen={false} />

//             {isPanelVisible && selectedProduct && (
//                 <div className="popupOverlay">
//                     <EditProductPanel
//                         product={selectedProduct}
//                         onSave={handleSave}
//                         onDelete={() => handleDelete(selectedProduct.id || selectedProduct.product_id)}
//                         onCancel={hidePanel}
//                     />
//                 </div>
//             )}

//             {canAccessAddButton && (
//                 <AddButton onClick={showPanel} props={"⛯"} />
//             )}
//         </>
//     );
// }

// export default ProductDetailsPage;


import React, { useState, useEffect } from 'react';
import NavBar from '../PageSections/NavBar/NavBar.jsx';
import Footer from '../PageSections/Footer/Footer.jsx';
import ProductDetailsBodySection from '../PageSections/ProductDetailsBodySection/ProductDetailsBodySection.jsx';
import ShoppingCart from '../ShoppingCart/ShoppingCart.jsx';
import AddButton from '../AddButton/AddButton.jsx';
import EditProductPanel from '../EditProductPanel/EditProductPanel.jsx';
import checkOwnership from '../api/checkOwnership.js'; // Import checkOwnership function
import EditProductCardPanel from '../EditProductCardPanel/EditProductCardPanel.jsx'


function ProductDetailsPage() {

    useEffect(() => {
        document.title = `Product Details`; // Change this text as needed
    }, []);

    const [isPanelVisible, setIsPanelVisible] = useState(false);
    const [canAccessAddButton, setCanAccessAddButton] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [ownsProduct, setOwnsProduct] = useState(null);

    // Function to show the edit panel and check product ownership
    const showPanel = async () => {
        const storedProduct = localStorage.getItem('clickedProduct');
        const ownerId = localStorage.getItem('owner'); // Retrieve owner_id from localStorage

        if (storedProduct && ownerId) {
            const product = JSON.parse(storedProduct);

            // Check ownership using the imported API function
            const ownershipStatus = await checkOwnership(ownerId, product.id || product.product_id);
            setOwnsProduct(ownershipStatus);

            setSelectedProduct(product);
        } else {
            setSelectedProduct({ id: '', name: '', price: '', description: '', available: false, display: false });
        }
        setIsPanelVisible(true);
    };

    // Function to hide the panel
    const hidePanel = () => {
        setIsPanelVisible(false);
        setSelectedProduct(null);
    };

    // Handle saving product
    const handleSave = (updatedProduct) => {
        localStorage.setItem(`product_${updatedProduct.id || updatedProduct.product_id}`, JSON.stringify(updatedProduct));
        localStorage.setItem('clickedProduct', JSON.stringify(updatedProduct)); // Update the clicked product as well
        hidePanel();
    };

    // Handle deleting product
    const handleDelete = (productId) => {
        localStorage.removeItem(`product_${productId}`);
        localStorage.removeItem('clickedProduct'); // Remove the clicked product as well
        hidePanel();
    };

    // useEffect to handle adminState and ownership status
    useEffect(() => {
        const checkAccess = async () => {
            const adminState = localStorage.getItem('adminState');
            const ownerId = localStorage.getItem('owner');
            const storedProduct = localStorage.getItem('clickedProduct');

            if (storedProduct && ownerId) {
                const product = JSON.parse(storedProduct);

                const ownershipStatus = await checkOwnership(ownerId, product.id || product.product_id);
                setOwnsProduct(ownershipStatus);

                if (adminState && (parseInt(adminState, 10) === 0 || parseInt(adminState, 10) === 1 || parseInt(adminState, 10) === 2 && ownershipStatus) ) {
                    setCanAccessAddButton(true);
                    console.log(`${ownershipStatus}: OwnerShip is currently`)

                } else {
                    setCanAccessAddButton(false);
                }
            } else {
                setCanAccessAddButton(false);
            }
        };

        checkAccess();
    }, []);

    return (
        <>
            <NavBar />
            <ProductDetailsBodySection />
            <Footer />
            <ShoppingCart initialOpen={false} />

            {isPanelVisible && (
                <div className="popupOverlay">
                    <EditProductCardPanel
                        product={selectedProduct}
                        onSave={handleSave}
                        onDelete={() => handleDelete(selectedProduct.id || selectedProduct.product_id)}
                        onClose={hidePanel}
                    />
                </div>
            )}

            {canAccessAddButton && (
                <AddButton onClick={showPanel} props={"⛯"} />
            )}
        </>
    );
}

export default ProductDetailsPage;
