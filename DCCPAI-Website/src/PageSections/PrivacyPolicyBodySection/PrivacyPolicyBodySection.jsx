import FlavorTextLeftFull from '../../FlavorTextLeftFull/FlavorTextLeftFull';
import styles from './PrivacyPolicyBodySection.module.css';

function PrivacyPolicyBodySection() {
    return(
    <>
    <div className={styles.privacyPolicyBodyContainer}>
        <FlavorTextLeftFull mainText="1. Information We Collect"/>
        <FlavorTextLeftFull mainText="2. How we use your information"/>
        <FlavorTextLeftFull mainText="3. How we share your information"/>
        <FlavorTextLeftFull mainText="4. How We Protect Your Data" subText="We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. These measures include encryption, secure access protocols, and regular security reviews. However, no method of transmission over the Internet or method of electronic storage is completely secure, and we cannot guarantee its absolute security."/>
        <FlavorTextLeftFull mainText="5. Your Data Rights"/>
        <FlavorTextLeftFull mainText="6. Cookies" subText="We use cookies and similar tracking technologies to enhance your experience on our Site. Cookies help us analyze web traffic, customize services, and target advertising. You can control the use of cookies through your browser settings."/>
        <FlavorTextLeftFull mainText="7. Third-Party Links" subText="Our Site may include links to third-party websites, plug-ins, or services. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy policies. We encourage you to read the privacy policy of every website you visit."/>
        <FlavorTextLeftFull mainText="8. Children's Privacy" subText="Our services are not directed to individuals under the age of 13, and we do not knowingly collect personal data from children under the age of 13. If we become aware that we have collected personal information from children without parental consent, we will take steps to delete it."/>
        <FlavorTextLeftFull mainText="9. Changes to this Privacy Policy" subText="We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated Effective Date. We encourage you to review this policy periodically to stay informed about how we protect your information."/>
        <FlavorTextLeftFull mainText="10. Contact Us"/>
    </div>
    </>
    );
}

export default PrivacyPolicyBodySection