// import React, { useState, useEffect } from 'react';
// import styles from './EditProductCardPanel.module.css';
// import TextButton from '../TextButton/TextButton';
// import { Link, useNavigate } from "react-router-dom";

// // APIs
// import { updateProduct } from '../api/updateProduct';
// import { deleteProduct } from '../api/deleteProduct';
// function EditProductCardPanel(product, onSave, onDelete, onCancel) {

//     return (
//         <>
//         <div className={styles.panelContainer}>

//             <div className={styles.topRow}>
//                 <button className={styles.xButton}>&times;</button>
//             </div>

//             <div className={styles.productCardPanelGrid}>


            
//             <div className={styles.rightSide}>
//                 <div className={styles.panelInputDiv} >
//                     <input type="text" placeholder="Name" className={styles.panelInput}>
//                     </input>
//                 </div>

//                 <div className={styles.panelInputDiv} >
//                     <input type="text" placeholder="Description" className={styles.panelInput}>
//                     </input>
//                 </div>

//                 <div className={styles.panelInputDiv} >
//                     <input type="text" placeholder="Price" className={styles.panelInput}>
//                     </input>
//                 </div>
//             </div>

//             </div>

//             <div className={styles.bottomInputsDiv}>

//             <div className={styles.bottomInputs}>
//                 <h1>Display:</h1>
//                 <input type="radio" className={styles.displayRadial}></input>
//             </div>

//             <div className={styles.bottomInputs}>
//                 <h1>Available:</h1>
//                 <input type="radio" className={styles.displayRadial}></input>
//             </div>

//             </div>

//             <div className={styles.bottomButtons}>
//                 <TextButton buttonText="Cancel" />
//                 <TextButton buttonText="Add" />
//             </div>

//         </div>
//         </>
//     );
// }


// export default EditProductCardPanel;

import React, { useState, useEffect, useRef  } from 'react';
import styles from './EditProductCardPanel.module.css';
import TextButton from '../TextButton/TextButton';
import { useNavigate } from "react-router-dom";
import PopupConfirmation from '../PopupConfirmation/PopupConfirmation.jsx';
import axios from 'axios'; // Add Axios for making requests
import fetchCategories from '../api/fetchCategories.js';



// APIs
import { updateProduct } from '../api/updateProduct';  
import { deleteProduct } from '../api/deleteProduct';  
import checkOwnership from '../api/checkOwnership.js'; // Import checkOwnership function
import { getProductOwnerById } from '../api/getProductOwnerByProductId.js';

function EditProductCardPanel({ product, onSave, onDelete, onClose }) {


    const fallbackImageUrl = 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=2139&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; // Fallback image URL

    const fileInputRef = useRef(null); // Create a ref for the file input

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [available, setAvailable] = useState(false);
    const [display, setDisplay] = useState(false);
    const [category, setCategory] = useState('');

    const [isSaving, setIsSaving] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);  // Admin access
    const [showPopup, setShowPopup] = useState(false);
    const [popupAction, setPopupAction] = useState(false); // Save/Delete action
    
    const [ownsProduct, setOwnsProduct] = useState(false); // Check ownership
    const [canAccessAddButton, setCanAccessAddButton] = useState(false); // Control access for buttons
    const [canUpdateImage, setCanUpdateImage] = useState(false); // Specifically for update-only access
    const [selectedFile, setSelectedFile] = useState(null); // For image upload
    const [filenames, setFilenames] = useState([]); // To store filenames

    const [categories, setCategories] = useState([]);
    const [isNewCategory, setIsNewCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [categoryId, setCategoryId] = useState('');



    const [imageUrls, setImageUrls] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); // To track the current image index


    const [products, setProduct] = useState(null);
    const [productOwner, setProductOwner] = useState('');  

    useEffect(() => {
        fetchCategories()
            .then(data => {
                setCategories(data);  // Set the fetched categories in state
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    // Handle category selection
    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        
        // Handle "Add New Category" selection
        if (selectedCategoryId === "new") {
            setIsNewCategory(true);
            setCategory('');  // Clear category selection
            setNewCategoryName('');  // Clear the new category input
        } else {
            // Update category ID for existing category selection
            setIsNewCategory(false);
            setCategory(selectedCategoryId);  // Set selected category ID
        }
    };


    // Handle new category name change
    const handleNewCategoryChange = (e) => {
        setNewCategoryName(e.target.value);
    };


    const navigate = useNavigate();

    // New Version
    // Check adminState from localStorage and set the admin access state
    
    useEffect(() => {
        const adminState = localStorage.getItem('adminState');
        // Set admin rights if adminState is 0 or 1
        setIsAdmin(adminState === '0' || adminState === '1');
    }, []);

    useEffect(() => {
        if (product) {
            console.log("Product received:", product); // Debug log
            setId(Number(product.id));
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setAvailable(product.available);
            setDisplay(product.display);
            setCategory(product.category_id)
        }
    }, [product]);

    console.log(`${product.category_id} CATEGORY ID IDIDID From Outside`)
    useEffect(() => {
        console.log(`${product.id} Data From Inside1`)

        if (!product || (!product.id && !product.product_id)) return; // Ensure product exists and has a valid id
        console.log(`${product.id} Data From Inside2`)

        // Load product images using product id
        loadProductImages(product.id || product.product_id);

        // Function to check access based on adminState and ownership
        const checkAccess = async () => {
            const adminState = localStorage.getItem('adminState');
            const ownerId = localStorage.getItem('owner');
            const storedProduct = localStorage.getItem('clickedProduct');

            if (storedProduct && ownerId) {
                try {
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
                } catch (error) {
                    console.error("Error checking ownership:", error);
                    // Handle any errors in the ownership check
                    setCanAccessAddButton(false);
                    setCanUpdateImage(false);
                }
            } else {
                setCanAccessAddButton(false);
                setCanUpdateImage(false);
            }
        };

        // Call the async function to check access
        checkAccess();

        // Add product as a dependency so this useEffect re-runs when product changes
    }, [product]);  // Add product to the dependency array



    const loadProductImages = async (product) => {



        console.log(`${product} Data From Inside3`)
        const productId = product
        console.log(`${productId} Data From Inside4`)


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

    const nextImage = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    const prevImage = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);

    const handleUpload = async () => {

        if (!selectedFile) {
            alert("No file selected. Please choose a file to upload.");
            return; // Exit the function if no file is selected
        }

        // Check if a file is selected
        if (!selectedFile) {
            alert("No file selected. Please choose a file to upload.");
            return; // Exit the function if no file is selected
        }

        // Confirm before uploading
        const confirmUpload = window.confirm("Are you sure you want to upload this image?");
        if (!confirmUpload) return; // If user cancels, exit the function

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
                alert('Image uploaded successfully!');
                loadProductImages(product.id); // Reload images after upload
                fileInputRef.current.value = ''; // Reset file input field after successful upload
                setSelectedFile(null); // Optionally clear selected file state

            } else {
                alert('Error uploading image: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image');
        }
        loadProductImages(product.id); // Reload images after upload

    };

    // Update Image Handler with confirmation
    const handleUpdate = async () => {
        // Check if a file is selected
        if (!selectedFile) {
            alert("No file selected. Please choose a file to upload.");
            return; // Exit the function if no file is selected
        }

        // Confirm before uploading
        const confirmUpload = window.confirm("Are you sure you want to update this image?");
        if (!confirmUpload) return; // If user cancels, exit the function

        if (!selectedFile || !product || filenames.length === 0) return;

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
                alert('Image updated successfully!');
                loadProductImages(product.id); // Reload images after update
                fileInputRef.current.value = ''; // Reset file input field after successful upload
                setSelectedFile(null); // Optionally clear selected file state

            } else {
                alert('Error updating image: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error updating image:', error);
            alert('Error updating image');
        }
        loadProductImages(product.id); // Reload images after upload

    };


    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };


    const handleDelete = async () => {
        // Confirm before uploading
        const confirmUpload = window.confirm("Are you sure you want to upload this image?");
        if (!confirmUpload) return; // If user cancels, exit the function

        if (!product || filenames.length === 0) return;

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
                alert('Image deleted successfully!');
                loadProductImages(product.id); // Reload images after delete
            } else {
                alert('Error deleting image: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error deleting image:', error);
            alert('Error deleting image');
        }
        loadProductImages(product.id); // Reload images after upload

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


    const handleUpdateProduct = async () => {
        setShowPopup(true);
        setPopupAction('save');
    };

    const handleDeleteProduct = async () => {
        setShowPopup(true);
        setPopupAction('delete');
    };

    const handleConfirmAction = async () => {
        setIsSaving(true);
        setShowPopup(false); // Close popup

        console.log(`We are sending ${category} to the Category 124124512412125125125`)
        // For Popups
        if (popupAction === 'save') {
            const updatedProduct = {
                product_id: product.id || product.product_id,
                product_name: name,
                product_description: description,
                product_price: parseFloat(price),
                product_available: available, // Add available field
                product_display: display,     // Add display field
                category_id: Number(category)
            };

            const result = await updateProduct(updatedProduct);  // Use updateProduct API function
            if (result.success) {
                alert('Product updated successfully:', updatedProduct);
                onSave(updatedProduct);
                navigate("/shop"); // Navigate to the shop page after saving
            } else {
                console.error('Error updating product:', result.message);
                alert('An error occurred: ' + result.message);
            }

        } else if (popupAction === 'delete') {
            const result = await deleteProduct(product.id || product.product_id);  // Use deleteProduct API function
            if (result.success) {
                alert('Product deleted successfully:', product.name || product.product_name);
                onDelete(product.id || product.product_id);
                navigate("/shop"); // Navigate to the shop page after deletion
            } else {
                console.error('Error deleting product:', result.message);
                alert('An error occurred: ' + result.message);
            }
        }

        setIsSaving(false);
    };
    // Closing Popups
    const handleCancelAction = () => {
        setShowPopup(false);
    };


    return (
        // <form className={styles.panelContainer} onSubmit={handleUpdateProduct}>
        //     <div className={styles.topRow}>
        //         <button type="button" className={styles.xButton} onClick={onClose}>&times;</button>
        //     </div>

        //     <div className={styles.productCardPanelGrid}>

        //         <div className={styles.leftSideTop}>
        //             {imageUrls.length > 0 ? (
        //                 <>
        //                 <div className={styles.leftArrow}>
        //                     <a onClick={prevImage}><h1>{'<'}</h1></a> 
        //                 </div>
        //                     <div className={styles.imagePreview}>
        //                         <img
        //                             src={imageUrls[currentIndex]}
        //                             alt={`Product Image ${currentIndex + 1}`}
        //                             onError={(e) => e.target.src = fallbackImageUrl}
        //                         />
        //                         <div className={styles.imageCounter}>
        //                             {currentIndex + 1} / {imageUrls.length}
        //                         </div>
        //                     </div>
        //                         <div className={styles.rightArrow}>
        //                             <a onClick={nextImage}><h1>{'>'}</h1></a>
        //                         </div>
        //                 </>
        //                 ) : (
        //                     <div className={styles.imagePreview}>
        //                     <img src={fallbackImageUrl} alt="Fallback Image" className={styles.productImage} />
        //                     </div>

        //                 )}
                    

        //             <div className={styles.imageSubmission}>
        //                 <h1>Upload Image</h1>
        //                 <input
        //                     type="file"
        //                     className={styles.submitButton}
        //                     onChange={(e) => setSelectedFile(e.target.files[0])}


        //                 />
                        
        //             </div>
                    
        //             <div>
        //                 <TextButton
        //                     buttonText="Upload Image"
        //                     onClick={handleUpload}
        //                     isSubmit={true}
        //                 /> 

        //                 <TextButton
        //                     buttonText="Update Image"
        //                     onClick={handleUpdate}
        //                     isSubmit={true}
        //                 /> 
        //                 <TextButton
        //                     buttonText="Delete Image"
        //                     onClick={handleDelete}
        //                     isSubmit={true}
        //                 /> 
        //             </div>
        //         </div>

        //         <div className={styles.rightSide}>
        //             <div className={styles.panelInputDiv}>
        //                 <input
        //                     type="text"
        //                     placeholder="Name"
        //                     value={name}
        //                     onChange={(e) => setName(e.target.value)}
        //                     className={styles.panelInput}
        //                     disabled={isSaving}
        //                     required
        //                 />
        //             </div>

        //             <div className={styles.panelInputDiv}>
        //                 <input
        //                     type="text"
        //                     placeholder="Description"
        //                     value={description}
        //                     onChange={(e) => setDescription(e.target.value)}
        //                     className={styles.panelInput}
        //                     disabled={isSaving}
        //                     required
        //                 />
        //             </div>

        //             <div className={styles.panelInputDiv}>
        //                 <input
        //                     type="number"
        //                     placeholder="Price"
        //                     value={price}
        //                     onChange={(e) => setPrice(e.target.value)}
        //                     className={styles.panelInput}
        //                     disabled={isSaving || !isAdmin}
        //                     required
        //                 />
        //                 {!isAdmin && (
        //                     <p className={styles.restrictedNotice}>
        //                         Price editing is restricted to admin users.
        //                     </p>
        //                 )}
        //             </div>
        //         </div>
        //     </div>

        //     <div className={styles.bottomInputsDiv}>
        //         <div className={styles.bottomInputs}>
        //             <h1>Display:</h1>
        //             <input
        //                 type="checkbox"
        //                 checked={display}
        //                 onChange={(e) => setDisplay(e.target.checked)}
        //                 className={styles.displayRadial}
        //                 disabled={isSaving}
        //             />
        //         </div>

        //         <div className={styles.bottomInputs}>
        //             <h1>Available:</h1>
        //             <input
        //                 type="checkbox"
        //                 checked={available}
        //                 onChange={(e) => setAvailable(e.target.checked)}
        //                 className={styles.displayRadial}
        //                 disabled={isSaving}
        //             />
        //         </div>
        //     </div>

        //     <div className={styles.bottomButtons}>
        //         <TextButton
        //             buttonText={isSaving ? "Saving..." : "Save"}
        //             isSubmit={true}            // Ensure this is a submit button
        //             onClick={handleUpdateProduct}  // Set the action to save
        //             disabled={isSaving}
        //         />
        //         {isAdmin && (
        //             <TextButton
                        // buttonText={isSaving ? "Deleting..." : "Delete"}
                        // isSubmit={true}          // Ensure this is a submit button
                        // onClick={handleDeleteProduct} // Set the action to delete
                        // disabled={isSaving}
        //             />
        //         )}
        //         <TextButton
        //             buttonText="Cancel"
                    // isSubmit={true}           // Make this a button, not a link
                    // onClick={onClose}        // Handle cancel action
                    // disabled={isSaving}
        //         />
        //     </div>

        //     {showPopup && (
        //         <PopupConfirmation
        //             message={popupAction === 'save' ? 'Are you sure you want to save changes?' : 'Are you sure you want to delete this product?'}
        //             onConfirm={handleConfirmAction}
        //             onCancel={handleCancelAction}
        //         />
        //     )}
        // </form>
        
            <form onSubmit={handleUpdateProduct}>
            <div className={styles.panelContainer}>

            <div className={styles.topRow}>
                <div className={styles.editText}>Edit</div>
                <button className={styles.xButton} onClick={onClose}>&times;</button>
            </div>

            <div className={styles.productCardPanelGrid}>

            <div className={styles.leftSideTop}>
                {imageUrls.length > 0 ? (
                <>
                    <div>
                        <div className={styles.imagePreview}>
                            <img
                                src={imageUrls[currentIndex]}
                                alt={`Product Image ${currentIndex + 1}`}
                                onError={(e) => e.target.src = fallbackImageUrl}
                            />
                                    </div>
                                    
                    </div>
                </>
                ) : (
                    <div className={styles.imagePreview}>
                    <img src={fallbackImageUrl} alt="Fallback Image" className={styles.productImage} />
                    </div>

                )}
            </div>

            <div className={styles.rightSide}> 
                <div className={styles.panelInputDiv} >
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.panelInput}
                        disabled={isSaving}
                        required
                    />
                </div>

                <div className={styles.panelInputDiv} >
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={styles.panelInput}
                        disabled={isSaving}
                        required
                    />
                </div>

                <div className={styles.panelInputDiv}>
                    <select
                        className={styles.panelInput}
                        name="category_id"
                        value={isNewCategory ? "new" : category}
                        onChange={handleCategoryChange}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.category_id} value={category.category_id}>
                                {category.product_category}
                            </option>
                        ))}
                        {/* <option value="new">Add New Category</option> */}
                    </select>
                </div>

                {/* Render new category input if isNewCategory is true */}
                {isNewCategory && (
                    <div className={styles.panelInputDiv}>
                        <input
                            type="text"
                            placeholder="New Category Name"
                            value={newCategoryName}
                            onChange={handleNewCategoryChange}
                            className={styles.panelInput}
                            required
                        />
                    </div>
                )}


                <div className={styles.panelInputDiv} >
                    <div className={styles.panelInputDiv}>
                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className={styles.panelInput}
                            disabled={isSaving || !isAdmin}
                            required
                        />
                        {!isAdmin && (
                            <p className={styles.restrictedNotice}>
                                Price editing is restricted to admin users.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            </div>

            <div className={styles.leftAndRightButtonAndCounter}>
            {imageUrls.length > 0 && (
                <>
                <div className={styles.leftArrow} onClick={prevImage}>
                    <h1>{'<'}</h1>
                    </div>
                <div className={styles.imageCounter}>
                    {currentIndex + 1} / {imageUrls.length}
                </div>
                    
                <div className={styles.rightArrow} onClick={nextImage}>
                    <h1>{'>'}</h1>
                </div>
                </>
            )   }
            </div>

            <div className={styles.bottomInputsDiv}>

            <div className={`${styles.bottomInputs} ${styles.bottomInputButtons}`} onClick={handleUpload}>
                <h1>Upload Image</h1>
            </div>

            <div className={`${styles.bottomInputs} ${styles.bottomInputButtons}`} onClick={handleUpdate}>
                <h1>Update Image</h1>
            </div>

            <div className={`${styles.bottomInputs} ${styles.bottomInputButtons} ${styles.bottomInputButtonsDelete}`} onClick={handleDelete}>
                <h1>Delete Image</h1>
            </div>

            <div className={styles.bottomInputs}>
                <h1>Display:</h1>
                <input
                    type="checkbox"
                    checked={display}
                    onChange={(e) => setDisplay(e.target.checked)}
                    className={styles.displayRadial}
                    disabled={isSaving}
                />
            </div>

            <div className={styles.bottomInputs}>
                <h1>Available:</h1>
                <input
                    type="checkbox"
                    checked={available}
                    onChange={(e) => setAvailable(e.target.checked)}
                    className={styles.displayRadial}
                    disabled={isSaving}
                />
            </div>

            <div className={styles.imageSubmission}>
                <h1>Upload Image</h1>
                <input
                    ref={fileInputRef} // Attach the ref to the file input
                    type="file"
                    accept="image/*"
                    className={styles.submitButton}
                    onChange={handleFileChange}
                />

            </div>

            </div>

            <div className={styles.bottomButtons}>  
                    <TextButton
                        buttonText={isSaving ? "Saving..." : "Save"}
                        onClick={handleUpdateProduct}
                        isSubmit={true}
                        disabled={isSaving}
                    /> 
                    <TextButton
                        buttonText={isSaving ? "Deleting..." : "Delete"}
                        isSubmit={true}         
                        onClick={handleDeleteProduct} 
                        disabled={isSaving}
                    
                    /> 
                    <TextButton
                        buttonText="Cancel"
                        isSubmit={true}           // Make this a button, not a link
                        onClick={onClose}        // Handle cancel action
                        disabled={isSaving}
                    /> 
            </div>
            </div>
            
            {showPopup && (
                <PopupConfirmation
                    message={popupAction === 'save' ? 'Are you sure you want to save changes?' : 'Are you sure you want to delete this product?'}
                    onConfirm={handleConfirmAction}
                    onCancel={handleCancelAction}
                />
            )}
        </form>
    );
}

export default EditProductCardPanel;
