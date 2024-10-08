import styles from './FlavorTextWithButtonRight.module.css';
import TextButton from '../TextButton/TextButton.jsx';
import PropTypes from 'prop-types';

function FlavorTextWithButtonRight(props) {
    return (
        <div className={styles.whoWeAreTextContainer}>
            <div className={`${styles.whoWeAreMainText} ${styles.whoWeAreText}`}>
                {props.mainText}
            </div>
            
            <div className={`${styles.whoWeAreSubText} ${styles.whoWeAreText}`}>
                {props.children}
            </div>
            
            <div className={styles.buttonContainer}>
                <TextButton 
                    className={`${styles.button} ${styles.shopButton}`} 
                    buttonText={props.buttonLabel} 
                    buttonLink={props.buttonLeadsTo} 
                />
            </div>
        </div>
    );
}

FlavorTextWithButtonRight.propTypes = {
    mainText: PropTypes.string,
    buttonLabel: PropTypes.string,
    buttonLeadsTo: PropTypes.string,
    children: PropTypes.node, // To allow JSX content
};

FlavorTextWithButtonRight.defaultProps = {
    mainText: "Main Text (Right)",
    buttonLabel: "Button Label",
    buttonLeadsTo: "",
    children: "Default subText content here.",
};

export default FlavorTextWithButtonRight;
