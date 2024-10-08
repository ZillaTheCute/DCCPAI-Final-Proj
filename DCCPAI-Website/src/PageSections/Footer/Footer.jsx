import styles from '../Footer/Footer.module.css';
import logoImage from '../../Assets/Pictures/Logotext/DCCPAI Logotext2.png'
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className={styles.footerSection}>
      <div className={styles.footerContainer}>
        <div className={styles.leftMostLogo}>
          <div className={styles.footerLogoText}>
              <Link to="/" className="Link">
                <img src={logoImage} className={styles.logoImage}></img>
              </Link>
            </div>
        </div>
        <div className={`${styles.footerFirstColumn} ${styles.footerColumn}`}>
          <ul className={styles.footerList}>
            <Link to="/Shop" className="Link"><li>Shop</li></Link>
            <Link to="/FindUs" className="Link"><li>Find Us</li></Link>
            <Link to="/About" className="Link"><li>About Us</li></Link>
            <Link to="/PrivacyPolicy" className="Link"><li>Privacy Policy</li></Link>
          </ul>
        </div>
        <div className={`${styles.footerSecondColumn} ${styles.footerColumn}`}>
          <ul className={styles.footerList}>
            <Link to="/FAQ" className="Link"><li>Help & FAQ</li></Link>
            {/* <Link to="/PageNotFound" className="Link"><li>Delivery (Tentative) </li></Link> */}
            <Link to="/Returns" className="Link"><li>Returns</li></Link>
            <Link to="/Payments" className="Link"><li>Payment Methods</li></Link>
            {/* <Link to="/PageNotFound" className="Link"><li>Terms & Conditions (Tentative)</li></Link> */}
          </ul>
        </div>
        <div className={styles.footerContactText}>
          Questions? Send us a message through our Whatsapp. We'd love to hear from you.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
