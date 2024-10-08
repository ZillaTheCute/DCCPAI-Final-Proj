import PropTypes from 'prop-types';
import styles from './TextButton.module.css';
import { Link } from "react-router-dom";

function TextButton({ buttonText, buttonLink, isSubmit, onClick, isButton }) {
    if (isSubmit) {
        // If isSubmit is true, return a regular button element
        return (
            <button type="button" className={styles.TextButton} onClick={onClick}>
                {buttonText}
            </button>
        );
    } else if(isButton) {
        return (
            <button type="submit" className={styles.TextButton} onClick={onClick}>
                {buttonText}
            </button>
        );
    }
    else {
        // Otherwise, return the Link-wrapped button
        return (
            <Link to={`/${buttonLink}`} className="Link">
                <button className={styles.TextButton}>
                    {buttonText}
                </button>
            </Link>
        );
    }
}

TextButton.propTypes = {
    buttonText: PropTypes.string,
    buttonLink: PropTypes.string,
    isSubmit: PropTypes.bool,  // New prop to conditionally render the button
    onClick: PropTypes.func,   // Optional onClick handler
};



export default TextButton;
