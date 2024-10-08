import styles from './FAQBodySection.module.css';
import FlavorTextMiddle from '../../FlavorTextMiddle/FlavorTextMiddle.jsx';
import FlavorTextLeftSmall from '../../FlavorTextLeftSmall/FlavorTextLeftSmall.jsx';

function FAQBodySection() {
    return(
    <>
    <div className={styles.faqBodyContainer}>

        <div className={styles.searchBarDiv} >
            <h1>Help?</h1>
        <input type="text" placeholder="Search for Similar Issues" className={styles.searchBar}>
        </input>
        </div>

        <div className={styles.commonIssues}>
            <FlavorTextMiddle mainText='Common Issues' subText=''/>
        </div>
        
        <div className={styles.gridContainer}>
            <div className={styles.FAQCard}>
                <FlavorTextLeftSmall mainText="How can I place an order?"
                                    subText="Placing an order is easy! Simply browse our catalog, add your desired items to the cart, and proceed to checkout. You can also place an order by contacting our customer service team at [phone number/email]."/>
            </div>

            <div className={styles.FAQCard}>
                <FlavorTextLeftSmall mainText="How long does shipping take?"
                                    subText="Shipping times vary depending on your location and the shipping method selected. Typically, orders are processed within [time frame] and shipped within [time frame]. You can track your order through the link provided in your confirmation email."/>
            </div>

            <div className={styles.FAQCard}>
                <FlavorTextLeftSmall mainText="Can I cancel or modify my order?"
                                    subText="If you need to cancel or modify your order, please contact us as soon as possible. We’ll do our best to accommodate your request if the order hasn’t been processed or shipped yet. For more information, visit our Order Cancellation Policy page."/>
            </div>

            <div className={styles.FAQCard}>
                <FlavorTextLeftSmall mainText="Do you offer discounts or promotions?"
                                    subText="Yes, we regularly offer discounts and promotions. Be sure to sign up for our newsletter and follow us on social media to stay updated on the latest deals and special offers."/>
            </div>
        </div>

    </div>
    </>
    );
}

export default FAQBodySection