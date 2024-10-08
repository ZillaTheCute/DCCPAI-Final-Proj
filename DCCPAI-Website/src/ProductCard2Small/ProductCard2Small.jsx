import React, { useEffect, useState } from 'react';
import styles from './ProductCard2Small.module.css';
import PropTypes from 'prop-types';
import TextButtonSmall from '../TextButtonSmall/TextButtonSmall.jsx';
import { Link } from "react-router-dom";
import { getProductOwnerById } from '../api/getProductOwnerByProductId.js';

function ProductCard2Small({ id, name, description, price, category_id, display, available, product_deleted, buttonLink }) {
    const [product, setProduct] = useState(null);  
    const [imageSrc, setImageSrc] = useState(null);  
    const [productOwner, setProductOwner] = useState('');  

    const fallbackSrc = 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=2139&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    const imageFormats = ['png', 'jpg', 'jpeg', 'gif', 'webp'];

    useEffect(() => {
        // Try other image formats for the product image
        const loadImage = async () => {
            for (let format of imageFormats) {
                const img = new Image();
                img.src = `/uploads/product_${id}/${id}-1.${format}`;
                img.onload = () => setImageSrc(img.src);  // If image loads, set it as the image source
                // img.onerror = () => console.log(`Failed to load image in ${format} format`); // Log failure for each format
            }
        };

        loadImage();  // Attempt to load images when component mounts
    }, [id]);

    const handleClick = () => {
        const productData = {
            id,
            name,
            description,
            price,
            category_id,
            display,
            available,
            product_deleted,
        };

        localStorage.setItem('clickedProduct', JSON.stringify(productData));
        // console.log('Product stored in localStorage:', productData);  // Debugging
        
    };

    useEffect(() => {
        const currentProduct = {
            id,
            name,
            description,
            price,
            category_id,
            display,
            available,
            product_deleted,
        };

        setProduct(currentProduct); // Store the current product in the component state
        //DATA LEAK IN HERE IDK HOW TO FIX LUL

        // Store the clicked product in localStorage
        // console.log('Product stored in localStorage:', currentProduct);  // Debugging
    }, [id, name, description, price, category_id, display, available, product_deleted]);

    const addToCart = () => {
        const cartItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        console.log('Current cart items before adding:', cartItems);

        if (product) {  // Use product state directly
            cartItems.push(product); // Add the current product to the cart
            localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
            console.log('Product added to cart:', product);
            console.log('Updated cart items:', cartItems);

            // Trigger cart to update
            window.dispatchEvent(new Event('storage'));
        } else {
            console.error('No product to add to cart');
        }
    };

    // Optional: Truncate product name to depending on stated characters's limiter
    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    // Fetch ProductId's Owner
    useEffect(() => {
        const fetchOwner = async () => {
            try {
                const data = await getProductOwnerById(id);
                if (data.success) {
                    setProductOwner(data.product_owner_name);  
                } else {
                    console.error('No owner found');
                }
            } catch (error) {
                console.error('Failed to fetch product owner:', error);
            }
        };

        fetchOwner();
    }, [id]);

    return (
        <div className={styles.productCardContainer} onClick={handleClick}>
            <div className={styles.topRow}>
                <div className={styles.productReview}>
                    {productOwner || "No Owner Found"}  
                </div>
                <div className={styles.productPrice}>
                    {available ? (price ? `$${Number(price).toFixed(2)}` : "Price not available") : "Out of Stock"}
                </div>
            </div>

            <div className={styles.middlePicture}>
                <Link to={`/${buttonLink}`} className="Link">
                    <img 
                        src={imageSrc || fallbackSrc}
                        alt={name || "Product"} 
                        className={styles.productImage}
                        onError={(e) => e.target.src = fallbackSrc}
                    />
                </Link>
            </div>

            <div className={styles.bottomRow}>
                <div className={styles.productName}>
                    <Link to={`/${buttonLink}`} className="Link">
                        <div className={styles.productName}>{truncateText(name || "Unnamed Product", 12)}</div>
                    </Link>
                </div>
                <div className={styles.addToCart}>
                    <TextButtonSmall 
                        buttonText={available ? "Add To Cart" : "Unavailable"} 
                        onClick={addToCart} 
                        buttonLink="shop" 
                        disabled={!available} 
                    />
                </div>
            </div>
        </div>
    );
}


ProductCard2Small.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    category_id: PropTypes.number,
    display: PropTypes.bool,
    available: PropTypes.bool,
    product_deleted: PropTypes.bool,
};

export default ProductCard2Small;
