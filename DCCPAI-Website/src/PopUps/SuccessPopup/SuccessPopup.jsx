import React, { useEffect } from 'react';
import styles from './SuccessPopup.module.css';  

// LEGACY CODE NO USE!
function SuccessPopup({ message, onClose }) {
    useEffect(() => {
        // Automatically close the popup after 3 seconds
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        // Cleanup the timer when the component is unmounted
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <h3>{message}</h3>
            </div>
        </div>
    );
}

export default SuccessPopup;
