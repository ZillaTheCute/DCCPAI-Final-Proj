import styles from './WhoWeAreSection2.module.css'
import FlavorTextWithButtonRight from '../../FlavorTextWithButtonRight/FlavorTextWithButtonRight.jsx'

function WhoWeAreSection2() {
    return(
        <div className={styles.WhoWeAreSection2}>

            <div className={styles.contentDiv}>
                <div className={styles.textDiv}>
                    <FlavorTextWithButtonRight 
                        mainText="Who We Are"
                        buttonLabel="About"
                        buttonLeadsTo="About"
                    >
                        Since our inception in 2017, the Davao City Chocolate Processors Association Inc. (DCCPAI) has been dedicated to <em>advancing</em> cacao production across the Davao Region.
                    </FlavorTextWithButtonRight>
                </div>
                
            </div>
            
        </div>
    );
}

export default WhoWeAreSection2