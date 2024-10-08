import styles from './WhoWeAreSection.module.css'
import FlavorTextWithButtonRight from '../../FlavorTextWithButtonRight/FlavorTextWithButtonRight.jsx'
import WhoWeAreImage from './WhoWeAreImage/WhoWeAreImage.jsx'

function WhoWeAreSection() {
    return(
        <div className={styles.whoWeAreSection}>
            <WhoWeAreImage />
            <FlavorTextWithButtonRight mainText='Who We Are'
                                        subText="Since our inception in 2017, the Davao City Chocolate Processors Association Inc. (DCCPAI) has been dedicated to advancing cacao 
                                                production across the Davao Region. In line with our commitment to sustainable practices, we believe in producing high-quality 
                                                cacao and elevating the value of local cacao products."
                                        buttonLabel='About'
                                        buttonLeadsTo='About'/>
        </div>
    );
}

export default WhoWeAreSection