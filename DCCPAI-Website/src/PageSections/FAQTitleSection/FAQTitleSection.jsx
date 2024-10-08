import FlavorTextMiddle from '../../FlavorTextMiddle/FlavorTextMiddle';
import styles from '../FAQTitleSection/FAQTitleSection.module.css'

function FAQTitleSection() {
    return(
        <>
        <div className={styles.faqTitleContainer}>
            <FlavorTextMiddle mainText='Frequently Asked Questions' 
                                subText="Welcome to our FAQ page! Here, you'll find answers to the most common questions about our products, 
                                        services, and policies. If you have a question that isn't covered here, please feel free to reach out to our 
                                        customer support team for further assistance. "/> 
        </div>
        </>
    );
}

export default FAQTitleSection