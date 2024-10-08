import React from 'react';
import styles from './PopupConfirmation.module.css'; 

function PopupConfirmation({ message, onConfirm, onCancel }) {
    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <h3>{message}</h3>
                <div className={styles.buttonGroup}>
                    <button className={styles.confirmButton} onClick={onConfirm}>
                        Confirm
                    </button>
                    <button className={styles.cancelButton} onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PopupConfirmation;
