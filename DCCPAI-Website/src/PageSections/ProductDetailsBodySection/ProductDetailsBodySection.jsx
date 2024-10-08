import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Add Axios for making requests
import styles from './ProductDetailsBodySection.module.css';

// API's
import checkOwnership from '../../api/checkOwnership.js'; // Import checkOwnership function
import { getProductOwnerById } from '../../api/getProductOwnerByProductId.js';

// Use States
function ProductDetailsBodySection() {
    const [product, setProduct] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [filenames, setFilenames] = useState([]); // To store filenames
    const [currentIndex, setCurrentIndex] = useState(0); // To track the current image index
    const [selectedFile, setSelectedFile] = useState(null); // For image upload
    const [popupMessage, setPopupMessage] = useState(''); // For success/error messages

    const [ownsProduct, setOwnsProduct] = useState(false); // Check ownership
    const [canAccessAddButton, setCanAccessAddButton] = useState(false); // Control access for buttons
    const [canUpdateImage, setCanUpdateImage] = useState(false); // Specifically for update-only access

    const [productOwner, setProductOwner] = useState('');  


    const fallbackImageUrl = 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=2139&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; // Fallback image URL

    useEffect(() => {
        
        const storedProduct = localStorage.getItem('clickedProduct');
        if (storedProduct) {
            const parsedProduct = JSON.parse(storedProduct);
            setProduct(parsedProduct);

            if (parsedProduct && parsedProduct.id) {
                loadProductImages(parsedProduct.id);
            }
        } else {
            console.error('No product found in localStorage');
        }

        // Check access based on adminState and ownership
        const checkAccess = async () => {
            const adminState = localStorage.getItem('adminState');
            const ownerId = localStorage.getItem('owner');
            const storedProduct = localStorage.getItem('clickedProduct');

            if (storedProduct && ownerId) {
                const product = JSON.parse(storedProduct);

                const ownershipStatus = await checkOwnership(ownerId, product.id || product.product_id);
                setOwnsProduct(ownershipStatus);

                // AdminState logic: 
                // 0: Full access
                // 1: Access if owns the product
                // 2: Can only update the image if owns the product
                if (adminState) {
                    const parsedAdminState = parseInt(adminState, 10);
                    if (parsedAdminState === 0 || (parsedAdminState === 1 && ownershipStatus)) {
                        setCanAccessAddButton(true);
                    } else if (parsedAdminState === 2 && ownershipStatus) {
                        setCanUpdateImage(true); // Only allow update access
                    } else {
                        setCanAccessAddButton(false);
                        setCanUpdateImage(false);
                    }
                } else {
                    setCanAccessAddButton(false);
                    setCanUpdateImage(false);
                }
            } else {
                setCanAccessAddButton(false);
                setCanUpdateImage(false);
            }
        };

        checkAccess();
    }, []);

    const loadProductImages = async (productId) => {
        try {
            console.log(`Fetching filenames for product ID: ${productId}`);

            const response = await fetch(`http://localhost:5000/filenames?foldername=product_${productId}`);
            const data = await response.json();

            if (data.success && data.files.length > 0) {
                const basePath = `/uploads/product_${productId}/`;
                const commonExtensions = ['.png', '.jpg', '.jpeg', '.gif'];

                const imageList = [];

                for (const filename of data.files) {
                    for (const ext of commonExtensions) {
                        const imageUrl = `${basePath}${filename}${ext}`;
                        const img = new Image();
                        img.src = imageUrl;

                        img.onload = () => {
                            imageList.push(imageUrl);
                            setImageUrls([...imageList]);
                            setFilenames([...data.files]);
                            console.log(`Loaded image: ${imageUrl}`);
                        };

                        img.onerror = () => {
                            // console.log(`Failed to load image: ${imageUrl}`);
                        };
                    }
                }
            } else {
                console.log('No images found for this product.');
            }
        } catch (error) {
            console.error('Error loading product images:', error);
        }

        
    };



    const addToCart = () => {
        const cartItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        console.log('Current cart items before adding:', cartItems);
        if (product) {
            cartItems.push(product);
            localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
            console.log('Product added to cart:', product);
            console.log('Updated cart items:', cartItems);
            // Trigger cart to update
            window.dispatchEvent(new Event('storage'));
        } else {
            console.error('No product to add to cart');
        }
    };

    const nextImage = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    const prevImage = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);

    // Upload Image Handler
    const handleUpload = async () => {
        if (!selectedFile || !product) return;
        const formDataImage = new FormData();
        formDataImage.append('images', selectedFile); // Append file
        formDataImage.append('filename', `${product.id}`); // Specify product ID
        formDataImage.append('foldername', `product_${product.id}`);

        try {
            const response = await axios.post('http://localhost:5000/upload', formDataImage, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                setPopupMessage('Image uploaded successfully!');
                loadProductImages(product.id); // Reload images after upload
            } else {
                setPopupMessage('Error uploading image: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setPopupMessage('Error uploading image');
        }
    };

    // Update Image Handler with confirmation
    const handleUpdate = async () => {
        if (!selectedFile || !product || filenames.length === 0) return;

        // Confirm before updating
        const confirmUpdate = window.confirm("Are you sure you want to update this image?");
        if (!confirmUpdate) return; // If user cancels, exit the function

        const formData = new FormData();
        formData.append('file', selectedFile); // New image
        formData.append('filename', filenames[currentIndex]); // Filename to overwrite
        formData.append('foldername', `product_${product.id}`);

        try {
            const response = await axios.post('http://localhost:5000/overwrite-file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                setPopupMessage('Image updated successfully!');
                loadProductImages(product.id); // Reload images after update
                window.location.reload();
            } else {
                setPopupMessage('Error updating image: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error updating image:', error);
            setPopupMessage('Error updating image');
        }
    };

    // Delete Image Handler with confirmation
    const handleDelete = async () => {
        if (!product || filenames.length === 0) return;

        // Confirm before deleting
        const confirmDelete = window.confirm("Are you sure you want to delete this image?");
        if (!confirmDelete) return; // If user cancels, exit the function

        try {
            const response = await axios.delete('http://localhost:5000/delete-file', {
                data: {
                    deletedFilename: filenames[currentIndex],
                    foldername: `product_${product.id}`,
                },
            });
            if (response.data.success) {
                setPopupMessage('Image deleted successfully!');
                loadProductImages(product.id); // Reload images after delete
                window.location.reload();

            } else {
                setPopupMessage('Error deleting image: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error deleting image:', error);
            setPopupMessage('Error deleting image');
        }
    };
    


    useEffect(() => {
        if (!product || !product.id) return;  // Guard clause to prevent execution if product or product.id is not available
        console.log('Product in useEffect:', product);

        const fetchOwner = async () => {
            try {
                const data = await getProductOwnerById(product.id);
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
    }, [product]);

    if (!product) return <div>Loading...</div>;


    return (
        <div className={styles.productDetailsBodyContainer}>
            <div className={styles.imageWithArrowsDiv}>
                {imageUrls.length > 0 ? (
                    <>
                        <div className={styles.leftArrow}>
                            <a onClick={prevImage}><h1>{'<'}</h1></a> 
                        </div>
                            <img
                                src={imageUrls[currentIndex]}
                                alt={`Product Image ${currentIndex + 1}`}
                                className={styles.productImage}
                                onError={(e) => e.target.src = fallbackImageUrl}
                            />
                        <div className={styles.rightArrow}>
                            <a onClick={nextImage}><h1>{'>'}</h1></a>
                        </div>
                        {/* <div className={styles.imageCounter}>
                            {currentIndex + 1} / {imageUrls.length}
                        </div> */}
                    </>
                ) : (
                    <img src={fallbackImageUrl} alt="Fallback Image" className={styles.productImage} />
                )}

                {/* {canAccessAddButton && (
                    <div className={styles.fileUploadSection}>
                        <input
                            type="file"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                        <ul>
                            <li><button onClick={handleUpload}>Upload Image</button></li>
                            <li><button onClick={handleUpdate}>Update Selected Image</button></li>
                            <li><button onClick={handleDelete}>Delete Selected Image</button></li>
                        </ul>
                    </div>
                )} */}

                {/* {canUpdateImage && !canAccessAddButton && (
                    <div className={styles.fileUploadSection}>
                        <input
                            type="file"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                        <ul>
                            <li><button onClick={handleUpdate}>Update Selected Image</button></li>
                        </ul>
                    </div>
                )} */}
            </div>

            <div className={styles.textContainer}>
                <h1>{product.name || "Product Name"}</h1>
                <p><b>Price:</b> {product.price ? `$${Number(product.price).toFixed(2)}` : "Price not available"}</p>
                <p><b>Product Seller: </b>{productOwner || "Unknown Found"}  </p>
                <p><b>Product Description:</b></p>
                <p>{product.description || "Product Description"}</p>

                <button
                    onClick={() => addToCart()}
                    disabled={!product.available}
                >
                    {product.available ? "Add To Cart" : "Out of Stock"}
                </button>
                {popupMessage && <p>{popupMessage}</p>}
            </div>
        </div>
    );
}

export default ProductDetailsBodySection;
