import FlavorTextMiddle from '../../FlavorTextMiddle/FlavorTextMiddle';
import styles from '../TermsAndConditionsTitleSection/TermsAndConditionsTitleSection.module.css'

function TermsAndConditionsTitleSection() {
    return(
        <>
        <div className={styles.termsAndConditionsTitleContainer}>
            <FlavorTextMiddle mainText="Terms & Conditions" />
        </div>
        </>
    );
}

export default TermsAndConditionsTitleSection