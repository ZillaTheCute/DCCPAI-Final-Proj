import FlavorTextMiddle from '../../FlavorTextMiddle/FlavorTextMiddle';
import styles from '../PaymentsTitleSection/PaymentsTitleSection.module.css'

function PaymentsTitleSection() {
    return(
        <>
        <div className={styles.paymentsTitleContainer}>
            <FlavorTextMiddle mainText="Payments" />
        </div>
        </>
    );
}

export default PaymentsTitleSection