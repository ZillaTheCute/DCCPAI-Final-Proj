import styles from './WhoWeAreImage.module.css'

function WhoWeAreImage() {
    return(
        <div className={styles.whoWeAreImageContainer}>
            <img src="https://images.unsplash.com/photo-1717562192681-2a12beb652ac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Branches facing left" id="whoWeAreImage1" className={styles.whoWeAreImage}></img>
        </div>
    );
}

export default WhoWeAreImage