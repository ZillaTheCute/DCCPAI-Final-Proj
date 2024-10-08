import styles from '../HeroTitleSection/HeroTitleSection.module.css';
import TextButton from '../../TextButton/TextButton';

function HeroTitleSection() {
  return (
    <div className={styles.heroImageSection}>
      <div className={styles.heroImageContainer}>
        <div className={styles.heroImageContainerText}>
          <div className={styles.heroText}>The Chocolate Capital of <br></br> the Philippines.</div>
          <div className={styles.heroSubText}>Davao City Chocolate Processors Association Incorporated</div>
        </div>
        <div className={styles.buttonContainer}>
            <TextButton buttonText="Shop!" buttonLink="Shop" className={styles.buttonContainer}></TextButton>
        </div>
      </div>
    </div>
  );
}

export default HeroTitleSection;
