import styles from './FindUsBodySection.module.css';

function FindUsBodySection() {
    return(
    <>
    <div className={styles.findUsBodyContainer}>
    <iframe className={styles.googleMap}
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d989.9058650269143!2d125.59825963542929!3d7.053454304031678!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f9732938054621%3A0xa19fc0d97fbb92bd!2sTableya%20Center!5e0!3m2!1sen!2sph!4v1721222830063!5m2!1sen!2sph"
        width="1000"
        height="600"
        // style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
        >
    </iframe>
    </div>
    </>
    );
}

export default FindUsBodySection