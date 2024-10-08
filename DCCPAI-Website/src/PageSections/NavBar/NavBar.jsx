import styles from '../NavBar/NavBar.module.css';
import { Link } from "react-router-dom";
import logoImage from '../../Assets/Pictures/Logotext/DCCPAI Logotext2.png'
import ShoppingCart from '../../ShoppingCart/ShoppingCart';

function NavBar() {

    let adminState = JSON.parse(localStorage.getItem('adminState'));

    return (
        <nav className={styles.navBar}> 
            <div className={styles.navBarContainer}>
                
                <div className={styles.navBarLogoText}>
                    <Link to="/" className="Link">
                        <img src={logoImage} className={styles.logoImage}></img>
                    </Link>
                </div>

                <div className={styles.navBarContent}>

                    <Link to="/Shop" className="Link">
                        <div className={`${styles.navBarContentElement} ${styles.navBarShop}`}>
                        <p>Shop</p>
                        </div>
                    </Link>

                    <Link to="/FindUs" className="Link">
                        <div className={`${styles.navBarContentElement} ${styles.navBarFind}`}>
                        <p>Find Us</p>
                        </div>
                    </Link>

                    <Link to="/About" className="Link">
                        <div className={`${styles.navBarContentElement} ${styles.navBarAbout}`}>
                        <p>About</p>
                        </div>
                    </Link>

                    <a href="https://www.facebook.com/profile.php?id=61560759375913" target="_blank" rel="noopener noreferrer">
                        <div className={`${styles.navBarContentElement} ${styles.navBarIcon} ${styles.navBarFBLogo}`}>
                            <div className={styles.svgContainer}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`${styles.navBarSVG} ${styles.facebookIcon}`}><title>facebook</title><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" /></svg>
                            </div>
                        </div>
                    </a>

                    <a href="https://wa.me/639615136803" target="_blank" rel="noopener noreferrer">
                        <div className={`${styles.navBarContentElement} ${styles.navBarIcon}  ${styles.whatsAppLogo}`}>
                            <div className={styles.svgContainer}>
                                <a aria-label="Chat on WhatsApp" >
                                    <img alt="Chat on WhatsApp" className={styles.whatsAppLogoImage} src="/WhatsAppButtonGreenLarge.png" />
                                </a>
                            </div>
                        </div>
                    </a>

                    {adminState === null ? (
                        <Link to="/Login" className="Link">
                            <div className={`${styles.navBarContentElement} ${styles.navBarIcon} ${styles.navBarSearch}`}>
                                <div className={styles.svgContainer}>
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                        <circle cx="12" cy="7.25" r="5.73"></circle>
                                        <path d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05"></path>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <Link to="/Logout" className="Link">
                            <div className={`${styles.navBarContentElement} ${styles.navBarIcon} ${styles.navBarSearch}`}>
                                <div className={styles.svgContainer}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
                                        <path d="M10.09 15.59L11.5 14.17L7.34 10H20V8H7.34L11.5 3.83L10.09 2.41L3.5 9L10.09 15.59ZM19 18V6H17V18H19Z" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </nav> 
    );
}

export default NavBar