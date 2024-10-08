import styles from '../HeroTitleSection2/HeroTitleSection2.module.css';
import TextButton from '../../TextButton/TextButton';

function HeroTitleSection2() {
  return (
    <div className={styles.heroImageSection}>
      <div className={styles.heroTitleSectionCard}>
        {/* <a href="/uploads/brochure/brochure.pdf" download="brochure.pdf"> */}
          <p className={styles.heroText}>Davao City Chocolate Processors Association Incorporated.</p> 
        {/* </a> */}
            <p className={styles.subText}>Join us on a journey where passion meets quality. Together, we <em>celebrate</em> the art of chocolate-making while fostering sustainable practices that benefit our community.</p>
            <TextButton buttonText="Shop" buttonLink="Shop"/> 
        </div>
    </div>
  );
}

export default HeroTitleSection2;
