import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchCategories from '../api/fetchCategories';
import styles from '../ProductCardPanel/ProductCardPanel.module.css';
import TextButton from '../TextButton/TextButton';
import axios from 'axios';
import fetchLastProductId from '../api/fetchLastProductId';  // Import the function

// Popup Component Needed to Updated for the Code. Old Iteration
function Popup({ message, onClose }) {
    return (
        <div className={styles.popup}>
            <div className={styles.popupContent}>
                <h2>{message}</h2>
                <button onClick={onClose} className={styles.closeButton}>Close</button>
            </div>
        </div>
    );
}

Popup.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

function ProductCardPanel({ onClose }) {
    const fallbackSrc = 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=2139&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

    // Use State
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category_id: '',
        price: '',
        display: true,
        available: true,
    });
    const [categories, setCategories] = useState([]);
    const [isNewCategory, setIsNewCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [isCacaoProduct, setIsCacaoProduct] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [files, setFiles] = useState([]); // File uploads
    const [filename, setFilename] = useState(''); // Custom filename
    const [foldername, setFoldername] = useState(''); // Custom folder name
    const [imagePreviewSrc, setImagePreviewSrc] = useState(fallbackSrc); // Initial state uses fallback image
    const [numberOfImages, setNumberOfImages] = useState(0); // To track the number of images being uploaded


    // Fetch Categories and LastProductId, use for the ImageUpload and relationship
    useEffect(() => {
        // Fetch categories
        fetchCategories()
            .then(data => {
                setCategories(data);
            })
            .catch(console.error);

        // Fetch last product ID and set foldername/filename
        fetchLastProductId()
            .then(response => {
                const lastId = response.lastId;
                const numericLastId = Number(lastId) + 1;
                // Use the numericLastId as foldername and filename prefix
                setFoldername(`product_${numericLastId}`);
                setFilename(`${numericLastId}`);
            })
            .catch(error => {
                console.error('Error fetching last product ID:', error);
            });
    }, []);

    // For Input 
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Set Input Files
    const handleFileChange = (e) => {
        const filesArray = e.target.files;
        setFiles(filesArray);
        setNumberOfImages(filesArray.length); // Update the number of images

        const file = filesArray[0]; // Only show the first uploaded image for preview
        if (file) {
            const fileReader = new FileReader();
            fileReader.onload = (event) => {
                setImagePreviewSrc(event.target.result); // Update the image preview source
            };
            fileReader.readAsDataURL(file); // Convert the uploaded image to a base64 string for preview
        }
    };

    // Category Change
    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        if (selectedCategoryId === "new") {
            setIsNewCategory(true);
            setNewCategoryName('');
            setFormData({
                ...formData,
                category_id: '',
            });
        } else {
            setIsNewCategory(false);
            setFormData({
                ...formData,
                category_id: selectedCategoryId,
            });
        }
    };

    
    // New Category Change
    const handleNewCategoryChange = (e) => {
        const value = e.target.value;
        setNewCategoryName(value);
    };

    // For the Data of IfCacao/isCacao
    const handleCacaoSwitchChange = (e) => {
        setIsCacaoProduct(e.target.checked);
    };

    //For the Switch Design Purposes
    const handleDisplaySwitchChange = (e) => {
        setFormData({
            ...formData,
            display: e.target.checked,
        });
    };

    //For the Product  Availiability 
    const handleAvailableSwitchChange = (e) => {
        setFormData({
            ...formData,
            available: e.target.checked,
        });
    };

    // Handle Submit of ImageUploading and Adding Product
    const handleSubmit = async (e) => {
        e.preventDefault();

        const owner_id = localStorage.getItem('owner');
        if (!owner_id) {
            console.error("Owner ID not found in localStorage!");
            return;
        }

        const data = {
            product_name: formData.name,
            product_description: formData.description,
            product_price: parseFloat(formData.price),
            display: formData.display,
            available: formData.available,
            product_owner_id: parseInt(owner_id, 10),
            product_deleted: false,
            is_new_category: isNewCategory,
            new_category_name: newCategoryName,
            isCacaoProduct: isCacaoProduct ? 1 : 0,
        };

        if (!isNewCategory) {
            data.category_id = parseInt(formData.category_id, 10);
        }

        try {
            // Submit product data
            const productResponse = await axios.post('http://localhost/addProduct.php', data);
            if (productResponse.data.success) {
                alert('Product added successfully!');
            } else {
                alert('Error: ' + productResponse.data.message);
            }

            // Now handle image upload after product data
            // Submiting Data to the File System
            if (files.length > 0) {
                const formDataImage = new FormData();
                Array.from(files).forEach(file => {
                    formDataImage.append('images', file); // Append each file
                });
                formDataImage.append('filename', filename); // Append the custom filename
                formDataImage.append('foldername', foldername); // Append the custom folder name

                // Submit images
                const imageResponse = await axios.post('http://localhost:5000/upload', formDataImage, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (imageResponse.data.success) {
                    alert('Product and images uploaded successfully!');
                    window.location.reload();
                } else {
                    alert('Error uploading images: ' + imageResponse.data.message);
                }
            }

        } catch (error) {
            alert('There was an error adding the product or uploading files!');
            console.error('Error:', error);
        } finally {
            ProductCardPanel(true)
        }
        
    };

    return (
        
        <>
        <div className={styles.panelContainer}>

                <div className={styles.topRow}>
                    <div className={styles.addText}>Add</div>
                <button className={styles.xButton} onClick={onClose}>&times;</button>
            </div>
            
            <form onSubmit={handleSubmit}>


            <div className={styles.productCardPanelGrid}>

                <div className={styles.leftSideTop}>
                    <div className={styles.imagePreview}>
                        {/* Apply conditional gray-out effect and number overlay */}
                        <img 
                            src={imagePreviewSrc} 
                            alt="Uploaded product preview"
                            className={numberOfImages > 0 ? "grayedOutImage" : ""} // Apply grayed-out effect if images are being added
                        />
                        {numberOfImages > 0 && (
                                    <div className={styles.imageOverlay}>
                                {numberOfImages} image{numberOfImages > 1 ? 's' : ''} being added
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.rightSide}> 
                    <div className={styles.panelInputDiv} >
                        <input
                            type="text"
                            placeholder="Name"
                            className={styles.panelInput}
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className={styles.panelInputDiv} >
                        <input
                            type="text"
                            placeholder="Description"
                            className={styles.panelInput}
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className={styles.panelInputDiv}>
                        <select
                            className={styles.panelInput}
                            name="category_id"
                            value={isNewCategory ? "new" : formData.category_id}
                            onChange={handleCategoryChange}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option
                                    key={category.category_id}
                                    value={category.category_id}
                                    required>
                                    {category.product_category}
                                </option>
                            ))}
                            {/* <option value="new">Add New Category</option> */}
                        </select>
                    </div>

                    {isNewCategory && (
                        <>
                            <div className={styles.panelInputDiv}>
                                <input
                                    type="text"
                                    placeholder="New Category Name"
                                    className={styles.panelInput}
                                    value={newCategoryName}
                                    onChange={handleNewCategoryChange}
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div className={styles.panelInputDiv}>
                        <input
                            type="number"
                            placeholder="Price"
                            className={styles.panelInput}
                            name="price"
                            value={formData.price}
                            onChange={(e) => {
                                const value = e.target.value;
                                // Prevent negative numbers by checking if the value is >= 0
                                if (value >= 0) {
                                    handleInputChange(e);
                                }
                            }}
                            required
                        />
                    </div>
                </div>

            </div>

            <div className={styles.bottomInputsDiv}>
                    
            {isNewCategory && (
                <>
                <div className={styles.bottomInputs}>
                    <h1>A Cacao Product?</h1>
                    <input
                        type="checkbox"
                        checked={isCacaoProduct}
                        onChange={handleCacaoSwitchChange}
                    />
                </div>
                </>
            )}

            <div className={styles.bottomInputs}>
                <h1>Display:</h1>
                <input
                    type="checkbox"
                    checked={formData.display}
                    onChange={handleDisplaySwitchChange}
                />
            </div>

            <div className={styles.bottomInputs}>
                <h1>Available:</h1>
                    <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={handleAvailableSwitchChange}
                />
            </div>

            <div className={styles.imageSubmission}>
                <input className={styles.submitButton}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>

            </div>

                <div className={styles.bottomButtons}>
                    <TextButton
                        buttonText="Cancel"
                        onClick={onClose}
                        isSubmit={true}
                        
                    />
                    
                    <TextButton
                        buttonText="Add"
                        isButton={true}
                        
                    />
                    </div>
            </form>
        </div>
        </>
    );
}

ProductCardPanel.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ProductCardPanel;
