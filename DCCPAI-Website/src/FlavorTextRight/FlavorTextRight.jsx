import styles from '../FlavorTextRight/FlavorTextRight.module.css';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

function FlavorTextRight(props) {
    return (
        <div className={styles.whoWeAreTextContainer}>
            <div className={`${styles.whoWeAreMainText} ${styles.whoWeAreText}`}>{props.mainText}</div>
            <div className={`${styles.whoWeAreSubText} ${styles.whoWeAreText}`}>{props.children || props.subText}</div>
            {/* <div className={styles.buttonContainer}>
                <Link to="/pageUnderConstruction" className="Link">
                <TextButton className={`${styles.button} ${styles.shopButton}`} buttonText="About" />
                </Link>
            </div> */}
        </div>
    );
}

FlavorTextRight.propTypes = {  // Corrected "PropTypes" to "propTypes"
    mainText: PropTypes.string,
    subText: PropTypes.string,
    children: PropTypes.node,  // Added children prop type
};

FlavorTextRight.defaultProps = {
    mainText: "Main Text (Right)",
    subText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Senectus et netus et malesuada fames ac. Elementum facilisis leo vel fringilla est ullamcorper eget. Dignissim suspendisse in est ante in nibh mauris. Tincidunt eget nullam non nisi est.",
    children: "Default subText content here.",
};

export default FlavorTextRight;
