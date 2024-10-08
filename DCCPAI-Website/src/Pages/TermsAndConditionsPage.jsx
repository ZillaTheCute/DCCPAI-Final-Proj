import NavBar from '../PageSections/NavBar/NavBar.jsx'
import Footer from '../PageSections/Footer/Footer.jsx'
import TermsAndConditionsTitleSection from '../PageSections/TermsAndConditionsTitleSection/TermsAndConditionsTitleSection.jsx'
import TermsAndConditionsBodySection from '../PageSections/TermsAndConditionsBodySection/TermsAndConditionsBodySection.jsx'

function TermsAndConditionsPage() {
    return (
        <>
        <NavBar />  
        <TermsAndConditionsTitleSection />
        <TermsAndConditionsBodySection />
        <Footer /> 
        </>
    )
}

export default TermsAndConditionsPage