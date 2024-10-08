import React, { useState, useEffect } from 'react';
import PopupConfirmation from '../PopupConfirmation/PopupConfirmation.jsx';
import styles from './EditProductPanel.module.css';
import { useNavigate } from 'react-router-dom';

// APIs
import { updateProduct } from '../api/updateProduct';  
import { deleteProduct } from '../api/deleteProduct';  

function EditProductPanel({ product, onSave, onDelete, onCancel }) {
    // Use States
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [available, setAvailable] = useState(false);
    const [display, setDisplay] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);  // New state for admin access
    const [showPopup, setShowPopup] = useState(false);  // For showing the confirmation popup
    const [popupAction, setPopupAction] = useState(false); // To determine if it's a delete or save action

    const navigate = useNavigate(); // Initialize the navigate function

    // New Version
    // Check adminState from localStorage and set the admin access state
    useEffect(() => {
        const adminState = localStorage.getItem('adminState');
        // Set admin rights if adminState is 0 or 1
        setIsAdmin(adminState === '0' || adminState === '1');
    }, []);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setAvailable(product.available);
            setDisplay(product.display);
        }
    }, [product]);

    const handleSave = async () => {
        setShowPopup(true);
        setPopupAction('save');
    };

    const handleDelete = async () => {
        setShowPopup(true);
        setPopupAction('delete');
    };

    const handleConfirmAction = async () => {
        setIsSaving(true);
        setShowPopup(false); // Close popup
        // For Popups
        if (popupAction === 'save') {
            const updatedProduct = {
                product_id: product.id || product.product_id,
                product_name: name,
                product_description: description,
                product_price: parseFloat(price),
                product_available: available, // Add available field
                product_display: display,     // Add display field
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
        <div className={styles.panelContainer}>
            <h2>Edit Product</h2>
            <div className={styles.formGroup}>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSaving}
                />
            </div>
            <div className={styles.formGroup}>
                <label>Price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    disabled={isSaving || !isAdmin}  // Disable for non-admins
                />
                {!isAdmin && <p className={styles.restrictedNotice}>Price editing is restricted to admin users.</p>}
            </div>
            <div className={styles.formGroup}>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isSaving}
                />
            </div>
            <div className={styles.formGroup}>
                <label>Available:</label>
                <input
                    type="checkbox"
                    checked={available}
                    onChange={(e) => setAvailable(e.target.checked)}
                    disabled={isSaving}
                />
            </div>
            <div className={styles.formGroup}>
                <label>Display:</label>
                <input
                    type="checkbox"
                    checked={display}
                    onChange={(e) => setDisplay(e.target.checked)}
                    disabled={isSaving}
                />
            </div>
            <div className={styles.buttonGroup}>
                <button
                    className={styles.saveButton}
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? 'Saving...' : 'Save'}
                </button>
                {isAdmin && (  // Only admins can see the delete button
                    <button
                        className={styles.deleteButton}
                        onClick={handleDelete}
                        disabled={isSaving}
                    >
                        {isSaving ? 'Deleting...' : 'Delete'}
                    </button>
                )}
                <button
                    className={styles.cancelButton}
                    onClick={onCancel}
                    disabled={isSaving}
                >
                    Cancel
                </button>
            </div>

            {/* Render the confirmation popup */}
            {showPopup && (
                <PopupConfirmation
                    message={popupAction === 'save' ? 'Are you sure you want to save changes?' : 'Are you sure you want to delete this product?'}
                    onConfirm={handleConfirmAction}
                    onCancel={handleCancelAction}
                />
            )}
        </div>
    );
}

export default EditProductPanel;

            // <div className={styles.leftSideTop}>
            //     <div className={styles.imagePreview}>
            //         <h1>Image Preview Here</h1>
            //     </div>
            //     <div className={styles.panelInputDiv}></div>
            //     <div className={styles.imageSubmission}>
            //         <h1>Upload Image</h1>
            //     <input type="submit" className={styles.submitButton}></input>
            //     </div>
            //     <div>
            //         <TextButton buttonText="Upload Image" /> 
            //         <TextButton buttonText="Update Image" /> 
            //         <TextButton buttonText="Delete Image" /> 
            //     </div>

            // </div>