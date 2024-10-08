import styles from "./ProcessSourceSection.module.css";
import TextButton from '../../TextButton/TextButton';
import { Link } from "react-router-dom";

function ProcessSourceSection() {
    return (
        <div className={styles.processSourceSection}>
            <div className={styles.processSourceContainer}>
                <div className={styles.processSourceTextContainer}>
                    <div className={styles.theProcess}>
                        <div className={`${styles.theProcessTitleText} ${styles.processSourceText}`}>The Process</div>
                        <div className={`${styles.theProcessSubText} ${styles.processSourceText}`}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Senectus et netus et malesuada fames ac. Elementum facilisis leo vel fringilla est ullamcorper eget. Dignissim suspendisse in est ante in nibh mauris. Tincidunt eget nullam non nisi est.
                        </div>
                        <div className={styles.buttonContainer}>
                        <Link to="/underConstruction"><TextButton buttonText="Learn More"/></Link>
                        </div>
                    </div>
                    <div className={styles.theSource}>
                        <div className={`${styles.theSourceTitleText} ${styles.processSourceText}`}>The Source</div>
                        <div className={`${styles.theSourceSubText} ${styles.processSourceText}`}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Senectus et netus et malesuada fames ac. Elementum facilisis leo vel fringilla est ullamcorper eget. Dignissim suspendisse in est ante in nibh mauris. Tincidunt eget nullam non nisi est.
                        </div>
                        <div className={styles.buttonContainer}>
                        <Link to="/underConstruction"><TextButton buttonText="About"/></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ); 
}

export default ProcessSourceSection;
