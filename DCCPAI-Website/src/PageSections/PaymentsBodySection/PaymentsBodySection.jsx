import FlavorTextLeftFull from '../../FlavorTextLeftFull/FlavorTextLeftFull';
import styles from './PaymentsBodySection.module.css';

function PaymentsBodySection() {
    return(
    <>
    <div className={styles.paymentsBodyContainer}>
        <FlavorTextLeftFull />
        <FlavorTextLeftFull />
        <FlavorTextLeftFull />
    </div>
    </>
    );
}

export default PaymentsBodySection