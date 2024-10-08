import React from 'react';
import PropTypes from 'prop-types';
import styles from './AddButton.module.css';

function AddButton({ onClick, props}) {
    return (
        <div className={styles.circleAddButton} onClick={onClick}>
            <h1>{props}</h1>
            {console.log ('Button Clicked!')}
        </div>
    );
}

AddButton.propTypes = {
    onClick: PropTypes.func.isRequired, // Ensure onClick is passed and is a function
};

export default AddButton;
