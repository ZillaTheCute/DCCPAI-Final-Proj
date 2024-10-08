// // // import React, { useState, useEffect } from 'react';
// // // import styles from './ShoppingCart.module.css';

// // // function ShoppingCart({ initialOpen = false }) {
// // //     const [isOpen, setIsOpen] = useState(initialOpen);
// // //     const [cartItems, setCartItems] = useState([]);
// // //     const [totalPrice, setTotalPrice] = useState(0);

// // //     // Fetch LocalStorage Variable shoppingCart for Data
// // //     useEffect(() => {
// // //         const storedItems = localStorage.getItem('shoppingCart');
// // //         if (storedItems) {
// // //             const items = JSON.parse(storedItems);
// // //             setCartItems(items);
// // //             calculateTotalPrice(items);
// // //             console.log('Cart items loaded:', items);
// // //         }
// // //     }, []);

// // //     // Handle Storing of Cart Data
// // //     useEffect(() => {
// // //         const handleStorageChange = () => {
// // //             const storedItems = localStorage.getItem('shoppingCart');
// // //             if (storedItems) {
// // //                 const items = JSON.parse(storedItems);
// // //                 setCartItems(items);
// // //                 calculateTotalPrice(items);
// // //             }
// // //         };

// // //         window.addEventListener('storage', handleStorageChange);

// // //         return () => {
// // //             window.removeEventListener('storage', handleStorageChange);
// // //         };
// // //     }, []);

// // //     // Total Price in the Cart
// // //     const calculateTotalPrice = (items) => {
// // //         const total = items.reduce((acc, item) => acc + parseFloat(item.price), 0);
// // //         setTotalPrice(total.toFixed(2)); // Set total price with 2 decimal places
// // //     };

// // //     // Cart Open
// // //     const toggleCart = () => {
// // //         setIsOpen(!isOpen);
// // //     };
// // //     // Item Removal
// // //     const removeItemFromCart = (index) => {
// // //         const newCartItems = [...cartItems];
// // //         newCartItems.splice(index, 1);
// // //         setCartItems(newCartItems);
// // //         localStorage.setItem('shoppingCart', JSON.stringify(newCartItems));
// // //         calculateTotalPrice(newCartItems);
// // //     };
// // //     // Copy to Clipboard Functionality
// // //     const copyToClipboard = () => {
// // //         const formattedItems = cartItems.map(item => `${item.name} - $${item.price}`).join('\n');
// // //         const clipboardText = `${formattedItems}\n\nTotal Price: $${totalPrice}`;
// // //         navigator.clipboard.writeText(clipboardText)
// // //             .then(() => {
// // //                 alert('Cart details copied to clipboard!');
// // //             })
// // //             .catch(err => {
// // //                 console.error('Could not copy text: ', err);
// // //             });
// // //     };

// // //     return (
// // //         <div className={`${styles.cartContainer} ${isOpen ? styles.open : ''}`}>
// // //             <button className={styles.cartToggle} onClick={toggleCart}>
// // //                 <h2>
// // //                     <img
// // //                         src='/ShoppingCart.png'
// // //                         className={styles.cartLogo}
// // //                         alt="Cart Icon"
// // //                     />
// // //                 </h2>
// // //                 {isOpen ? 'Close Cart' : 'Open Cart'}
// // //             </button>
// // //             <div className={styles.cartContent}>
// // //                 <h2>Your Shopping Cart</h2>
// // //                 {cartItems.length === 0 ? (
// // //                     <p>No items in cart.</p>
// // //                 ) : (
// // //                     <>
// // //                         <ul>
// // //                             {cartItems.map((item, index) => (
// // //                                 <li key={index} className={styles.cartItem}>
// // //                                     <div className={styles.itemDetails}>
// // //                                         <span className={styles.itemName}>{item.name}</span>
// // //                                         <span className={styles.itemPrice}>${item.price}</span>
// // //                                     </div>
// // //                                     <button className={styles.removeButton} onClick={() => removeItemFromCart(index)}>Remove</button>
// // //                                 </li>
// // //                             ))}
// // //                         </ul>
// // //                             <div className={styles.totalPrice}>
// // //                                 <h1>
// // //                                     <strong>Total Price: ${totalPrice}</strong>
// // //                                 </h1>
// // //                             </div>
// // //                         <button className={styles.copyButton} onClick={copyToClipboard}>
// // //                             Copy to Clipboard
// // //                         </button>
// // //                     </>
// // //                 )}
// // //             </div>
// // //         </div>
// // //     );
// // // }

// // // export default ShoppingCart;

import React, { useState, useEffect } from 'react';
import styles from './ShoppingCart.module.css';

// Move getImageFallback outside the ShoppingCart component so both ShoppingCart and ProductImage can use it
const getImageFallback = (id) => {
    const extensions = ['png', 'jpg', 'jpeg'];  // File formats to check
    const variants = [`${id}-1`, `${id}-2`, `${id}-3`];  // Different file variants
    
    // Create all possible image URLs by combining variants and formats
    return variants.flatMap(variant => extensions.map(ext => `/uploads/product_${id}/${variant}.${ext}`));
};

function ShoppingCart({ initialOpen = false }) {
    const [isOpen, setIsOpen] = useState(initialOpen);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // Fetch LocalStorage Variable shoppingCart for Data
    useEffect(() => {
        const storedItems = localStorage.getItem('shoppingCart');
        if (storedItems) {
            const items = JSON.parse(storedItems);
            setCartItems(groupItems(items)); // Group items by quantity
            calculateTotalPrice(items);
            console.log('Cart items loaded:', items);
        }
    }, []);

    // Handle Storing of Cart Data
    useEffect(() => {
        const handleStorageChange = () => {
            const storedItems = localStorage.getItem('shoppingCart');
            if (storedItems) {
                const items = JSON.parse(storedItems);
                setCartItems(groupItems(items)); // Group items by quantity
                calculateTotalPrice(items);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Group items by product name and count their quantity
    const groupItems = (items) => {
        const groupedItems = [];
        items.forEach((item) => {
            const existingItem = groupedItems.find(groupedItem => groupedItem.name === item.name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                groupedItems.push({ ...item, quantity: 1 });
            }
        });
        return groupedItems;
    };

    // Total Price in the Cart
    const calculateTotalPrice = (items) => {
        const total = items.reduce((acc, item) => acc + parseFloat(item.price), 0);
        setTotalPrice(total.toFixed(2)); // Set total price with 2 decimal places
    };

    // Cart Open
    const toggleCart = () => {
        setIsOpen(!isOpen);
    };

    // Item Removal
    const removeItemFromCart = (index) => {
        const newCartItems = [...cartItems];
        if (newCartItems[index].quantity > 1) {
            newCartItems[index].quantity -= 1;
        } else {
            newCartItems.splice(index, 1);
        }
        setCartItems(newCartItems);
        localStorage.setItem('shoppingCart', JSON.stringify(flattenItems(newCartItems)));
        calculateTotalPrice(flattenItems(newCartItems));
    };

    // Flatten the grouped items back to the original array format for storage
    const flattenItems = (groupedItems) => {
        return groupedItems.flatMap(item => Array(item.quantity).fill({ name: item.name, price: item.price, id: item.id }));
    };

    // Copy to Clipboard Functionality
    const copyToClipboard = () => {
        const formattedItems = cartItems.map(item => `${item.quantity} x ${item.name} - $${item.price}`).join('\n');
        const clipboardText = `${formattedItems}\n\nTotal Price: $${totalPrice}`;
        navigator.clipboard.writeText(clipboardText)
            .then(() => {
                alert('Cart details copied to clipboard!');
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
            });
    };

    return (
        <div className={`${styles.cartContainer} ${isOpen ? styles.open : ''}`}>
            <button className={styles.cartToggle} onClick={toggleCart}>
                <h2>
                    <img
                        src='/ShoppingCart.png'
                        className={styles.cartLogo}
                        alt="Cart Icon"
                    />
                </h2>
                {isOpen ? 'Close Cart' : 'Open Cart'}
            </button>
            <div className={styles.cartContent}>
                <h2>Your Shopping Cart</h2>
                {cartItems.length === 0 ? (
                    <h1>
                    <p>No items in cart.</p>
                    </h1>
                ) : (
                    <>
                        <ul>
                            {cartItems.map((item, index) => (
                                <li key={index} className={styles.cartItem}>
                                    <div className={styles.itemDetails}>
                                        {/* Container for product image and remove button */}
                                        <div className={styles.imageAndButtonContainer}>
                                            <ProductImage id={item.id} />
                                            <button className={styles.removeButton} onClick={() => removeItemFromCart(index)}>Remove</button>
                                        </div>
                                        
                                        {/* Product name and price */}
                                        <div className={styles.textDetails}>
                                            <span className={styles.itemName}>{item.quantity} x {item.name}</span>
                                            <span className={styles.itemPrice}>${item.price}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className={styles.totalPrice}>
                            <h1>
                                <strong>Total Price: ${totalPrice}</strong>
                            </h1>
                        </div>
                        <button className={styles.filterButton} onClick={copyToClipboard}>
                            Copy to Clipboard
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

// Component to manage image fallback
const ProductImage = ({ id }) => {
    const [imageSrc, setImageSrc] = useState(`/uploads/product_${id}/${id}-1.jpg`);
    const [attempt, setAttempt] = useState(0); // Keeps track of the current attempt

    const fallbackUrls = getImageFallback(id);

    // When an image fails to load, increment the attempt and try the next URL
    const handleImageError = () => {
        if (attempt < fallbackUrls.length - 1) {
            setAttempt(attempt + 1); // Move to the next image attempt
            setImageSrc(fallbackUrls[attempt + 1]); // Set the next URL as source
        } else {
            setImageSrc('https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=2139&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'); // Fallback if no image is found
        }
    };

    useEffect(() => {
        setImageSrc(fallbackUrls[0]); // Start with the first URL on initial render
    }, [id]);

    return (
        <img 
            src={imageSrc} 
            alt="Product" 
            className={styles.productImage} 
            onError={handleImageError} 
        />
    );
};

export default ShoppingCart;
