import React from 'react';
import styles from './ProductCard.module.css';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

//LEGACY CODE DONT NO USE!

function ProductCard(props) {

    return (
        <div className={styles.productCardContainer}>
            <div className={styles.productImageContainer}>
                <Link to={`/${props.buttonLink}`} className="Link">
                <img 
                    src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=2139&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Banana with a pink background" 
                    id="productImage1" 
                    className={styles.productImage}
                />
                </Link>
            </div>
            <div className={styles.productTextContainer}>
                <div className={styles.leftSideText}>
                    <Link to={`/${props.buttonLink}`} className="Link">
                    <div className={styles.productName}>Product Name</div>
                    </Link>
                    <div className={styles.productDescription}>Product Description</div>
                    <div className={styles.productPrice}>$100</div>
                </div>
                {/* <div className={styles.rightSideIcon}>
                    <div className={`${styles.svgContainer} ${styles.productCardSVGContainer}`}>
                        <Link to="/" className="Link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`${styles.productCardSVG} ${styles.circleRightChevron}`}>
                            <title>chevron-right-circle-outline</title>
                            <path d="M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M8.6,16.6L13.2,12L8.6,7.4L10,6L16,12L10,18L8.6,16.6Z" />
                        </svg>
                        </Link>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

ProductCard.PropTypes = {
    buttonLink: PropTypes.string,
}

ProductCard.defaultProps = {
    buttonLink: "",
}

export default ProductCard;
