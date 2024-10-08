import FlavorTextLeftFull from '../../FlavorTextLeftFull/FlavorTextLeftFull';
import styles from './ReturnsBodySection.module.css';

function ReturnsBodySection() {
    return(
    <>
    <div className={styles.returnsBodyContainer}>
        <FlavorTextLeftFull mainText="Return Eligibility" />
        <FlavorTextLeftFull mainText="Return Process" />
        <FlavorTextLeftFull mainText="Damaged or Defective Items" />
        <FlavorTextLeftFull mainText="Order Cancellations" />
        <FlavorTextLeftFull mainText="Contact Us" />
    </div>
    </>
    );
}

export default ReturnsBodySection