
import PropTypes from 'prop-types';
import styles from './TextButtonSmall.module.css';
import { Link } from "react-router-dom";

function TextButtonSmall({ buttonText, buttonLink, onClick, disabled }) {
    // For Button Input and Design
    
    return (
        <Link to={`/${buttonLink}`} className="Link">
            <button 
                className={styles.TextButton} 
                onClick={disabled ? null : onClick}  // Disable the click action if disabled is true
                disabled={disabled}  // HTML disabled attribute
                style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}  // Change cursor style when disabled
            >
                {buttonText}
            </button>
        </Link>
    );
}

TextButtonSmall.propTypes = {
    buttonText: PropTypes.string,
    buttonLink: PropTypes.string,
    onClick: PropTypes.func, 
    disabled: PropTypes.bool,  // Add disabled prop
};

TextButtonSmall.defaultProps = {
    buttonText: "Placeholder Text",
    buttonLink: "",
    onClick: () => {},
    disabled: false,  // Default to not disabled
};

export default TextButtonSmall;
