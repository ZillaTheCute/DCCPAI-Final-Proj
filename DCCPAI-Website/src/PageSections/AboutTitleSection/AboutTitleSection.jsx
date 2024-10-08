import styles from '../AboutTitleSection/AboutTitleSection.module.css'
import FlavorTextMiddle from '../../FlavorTextMiddle/FlavorTextMiddle';
import PictureCard from '../../PictureCard/PictureCard';
import FlavorTextLeft from '../../FlavorTextLeft/FlavorTextLeft';

function AboutTitleSection() {
    return(
        <>
        <div className={styles.aboutTitleContainer}>
            <div className={styles.aboutUsPicture}>
            </div>
            <div className={styles.aboutUsTitleText}>
            <FlavorTextLeft mainText='About Us'>
                                Since our inception in 2017, the Davao City Chocolate Processors Association Inc. (DCCPAI) has been dedicated to <em>advancing</em> cacao 
                                production across the Davao Region. In line with our commitment to <em>sustainable</em> practices, we believe in producing high-quality 
                                cacao and <em>elevating</em> the value of local cacao products. 
            </FlavorTextLeft>
        </div>
        </div>
        </>
    );
}

export default AboutTitleSection