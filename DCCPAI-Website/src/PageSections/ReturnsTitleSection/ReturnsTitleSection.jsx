import FlavorTextMiddle from '../../FlavorTextMiddle/FlavorTextMiddle';
import styles from '../ReturnsTitleSection/ReturnsTitleSection.module.css'

function ReturnsTitleSection() {
    return(
        <>
        <div className={styles.returnsTitleContainer}>
            <FlavorTextMiddle mainText="Returns" subText="At DCCPAI, we strive to ensure that you are completely satisfied with your purchase. 
                                                        If for any reason you need to return or exchange an item, please review our return policy below."/>
        </div>
        </>
    );
}

export default ReturnsTitleSection