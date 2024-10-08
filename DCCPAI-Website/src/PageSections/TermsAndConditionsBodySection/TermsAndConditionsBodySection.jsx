import FlavorTextLeftFull from '../../FlavorTextLeftFull/FlavorTextLeftFull';
import styles from './TermsAndConditionsBodySection.module.css';

function TermsAndConditionsBodySection() {
    return(
    <>
    <div className={styles.termsAndConditionsBodyContainer}>
        <FlavorTextLeftFull />
        <FlavorTextLeftFull />
        <FlavorTextLeftFull />
        <FlavorTextLeftFull />
        <FlavorTextLeftFull />
    </div>
    </>
    );
}

export default TermsAndConditionsBodySection