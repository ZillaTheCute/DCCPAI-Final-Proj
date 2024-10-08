import styles from '../FlavorTextLeft/FlavorTextLeft.module.css';
import PropTypes from 'prop-types';

function FlavorTextLeft(props) {
    return (
        <div className={styles.whoWeAreTextContainer}>
            <div className={`${styles.whoWeAreMainText} ${styles.whoWeAreText}`}>{props.mainText}</div>
            <div className={`${styles.whoWeAreSubText} ${styles.whoWeAreText}`}>
                {props.children || props.subText}
            </div>
        </div>
    );
}

FlavorTextLeft.propTypes = {
    mainText: PropTypes.string,
    subText: PropTypes.string,
    children: PropTypes.node, // Now accepting nodes (like JSX or HTML)
};

FlavorTextLeft.defaultProps = {
    mainText: "Main Text (Left)",
    subText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Senectus et netus et malesuada fames ac. Elementum facilisis leo vel fringilla est ullamcorper eget. Dignissim suspendisse in est ante in nibh mauris.",
    children: "Default subText content here.",
};

export default FlavorTextLeft;