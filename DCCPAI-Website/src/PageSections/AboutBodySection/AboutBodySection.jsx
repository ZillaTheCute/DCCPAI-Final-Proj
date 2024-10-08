import styles from './AboutBodySection.module.css';
import FlavorTextLeft from '../../FlavorTextLeft/FlavorTextLeft.jsx'
import FlavorTextWithButtonLeft from '../../FlavorTextWithButtonLeft/FlavorTextWithButtonLeft.jsx'
import FlavorTextRight from '../../FlavorTextRight/FlavorTextRight.jsx'
import FlavorTextWithButtonRight from '../../FlavorTextWithButtonRight/FlavorTextWithButtonRight.jsx'
import FlavorTextMiddle from '../../FlavorTextMiddle/FlavorTextMiddle.jsx';
import PictureCard from '../../PictureCard/PictureCard.jsx';

function AboutBodySection() {
    return(
    <>
    <div className={styles.aboutBodyContainer}>

        <div className={styles.missionVisionContainer}>
            <div className={styles.leftTextTop}>
                <FlavorTextLeft mainText="The Mission">
                                        To <em>empower</em> local cacao farmers by promoting sustainable farming practices, enhancing the quality and value of cacao products, 
                                        and fostering community-driven growth in the cacao industry. We are <em>committed</em> to building a resilient and prosperous future 
                                        for our members and their communities through education, innovation, and collaboration.    
                </FlavorTextLeft>
            </div>

            <div className={styles.flavorPicture}>
            </div>

            <div className={styles.leftTextBottom}>
                <FlavorTextRight mainText="The Vision">
                                            To be a leading force in the global cacao industry, recognized for our dedication to quality, sustainability, and the empowerment 
                                            of local farmers. We envision a <em>thriving cacao community</em> where our products are celebrated worldwide, and our members enjoy economic 
                                            prosperity and a sustainable livelihood.
                </FlavorTextRight>
            </div>
        </div>
        
        <div className={styles.theProcess}>
            <div className={styles.theProcessPicture}></div>
                <div className={styles.leftText}>
                    <a>
                        <FlavorTextWithButtonLeft mainText="The Process" buttonLabel="Video" buttonLink="https://www.youtube.com/watch?v=VMYAboyboFo&t">
                        Crafted through the <em>dedication</em> of our members, each step transforms locally sourced cacao into exceptional chocolate. From <em>careful</em> harvesting to <em>expert</em> fermentation and roasting, our process celebrates the rich flavors of the Davao region while embracing sustainable practices.
                        </FlavorTextWithButtonLeft>
                    </a>
            </div>
        </div>
        
        <div className={styles.theSource}>
            <div className={styles.rightText}>
                <FlavorTextWithButtonRight mainText="The Source" buttonLabel="Frequently Asked Questions" buttonLeadsTo="FAQ">
                Locally sourced through the hard work and the fertile farmland of our association's members, who strive tirelessly to <em>cultivate</em> the highest quality products in our community.
                </FlavorTextWithButtonRight>
            </div>
            <div className={styles.theSourcePicture}></div>
        </div>
        
        
        <div className={styles.bottomText}>
            <FlavorTextMiddle mainText="We hope to see you.">
                We are located @ Maya St, Ecoland Dr, Talomo, Davao City, Davao del Sur  
            </FlavorTextMiddle>
        </div>

    </div>
    </>
    );
}

export default AboutBodySection