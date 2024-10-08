import styles from '../FlavorTextMiddle/FlavorTextMiddle.module.css';
import PropTypes from 'prop-types';

function FlavorTextMiddle(props) {
    return (
        <>
            <div className={styles.textContainer}>
                <h1>{props.mainText}</h1>
                <p>{props.children || props.subText}</p>
            </div>
        </>
    );
}

FlavorTextMiddle.propTypes = {  // Corrected "PropTypes" to "propTypes"
    mainText: PropTypes.string,
    subText: PropTypes.string,
    children: PropTypes.node,  // Added children prop type
};

FlavorTextMiddle.defaultProps = {
    mainText: "Main Text (Middle)",
    subText: "(Sub Text) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac auctor augue mauris augue neque gravida. Ipsum dolor sit amet consectetur adipiscing elit ut.",
    children: "Default subText content here.",
};

export default FlavorTextMiddle;
