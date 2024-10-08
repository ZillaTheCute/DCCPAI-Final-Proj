import React from 'react';
import styles from './PictureCard.module.css';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import TextButton from '../TextButton/TextButton.jsx';
import TextButtonSmall from '../TextButtonSmall/TextButtonSmall.jsx';

function PictureCard(props) {

    return (
        <div className={styles.productCardContainer}>
            <div className={styles.middlePicture}>
                [Picture Goes Here]
            </div>
        </div>
    );
}

// PictureCard.PropTypes = {
//     buttonLink: PropTypes.string,
// }

// PictureCard.defaultProps = {
//     buttonLink: "",
// }

export default PictureCard;
