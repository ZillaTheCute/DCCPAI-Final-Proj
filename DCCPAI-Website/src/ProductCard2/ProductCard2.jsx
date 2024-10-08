import React, { useEffect, useState } from 'react';
import styles from './ProductCard2.module.css';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import TextButtonSmall from '../TextButtonSmall/TextButtonSmall.jsx';

// API's
import { getProductOwnerById } from '../api/getProductOwnerByProductId.js';

function ProductCard2({ id, name, description, price, category_id, display, available, product_deleted, buttonLink }) {
    // Use States
    const [product, setProduct] = useState(null);  
    const [imageSrc, setImageSrc] = useState(null);  
    const [productOwner, setProductOwner] = useState('');  

    // Fallback Image just in case no image or broken image
    const fallbackSrc = 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=2139&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    const imageFormats = ['png', 'jpg', 'jpeg', 'gif', 'webp'];

    // Load Image for the ProductCard just grabs the first Image
    // Needed to be added incase of no Image-1
    useEffect(() => {
        const loadImage = async () => {
            for (let format of imageFormats) {
                const img = new Image();
                img.src = `/uploads/product_${id}/${id}-1.${format}`;
                img.onload = () => setImageSrc(img.src);  
            }
        };
        loadImage();
    }, [id]);

    // Set ProductData to the localStorage
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
    };

    // Set the data to the Page. I think this is where data leak happen!
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

        setProduct(currentProduct);
    }, [id, name, description, price, category_id, display, available, product_deleted]);

    // Add to Cart Functionality
    const addToCart = () => {
        if (!available) {
            console.log('Product is not available, cannot add to cart.');
            return;
        }

        const cartItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        if (product) {  
            cartItems.push(product);
            localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
            window.dispatchEvent(new Event('storage'));
        } else {
            console.error('No product to add to cart');
        }
    };

    // Truncate Image for formatting
    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    // Fetch Owner Name from ProductId
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
                        <div className={styles.productName}>{truncateText(name || "Unnamed Product", 10)}</div>
                    </Link>
                </div>
                <div className={styles.addToCart}>
                    {/* Disable button if the product is unavailable */}
                    <TextButtonSmall 
                        buttonText={available ? "Add To Cart" : "Unavailable"} 
                        onClick={addToCart} 
                        buttonLink="" 
                        disabled={!available} 
                    />
                </div>
            </div>
        </div>
    );
}

ProductCard2.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    category_id: PropTypes.number,
    display: PropTypes.bool,
    available: PropTypes.bool,
    product_deleted: PropTypes.bool,
};

export default ProductCard2;
