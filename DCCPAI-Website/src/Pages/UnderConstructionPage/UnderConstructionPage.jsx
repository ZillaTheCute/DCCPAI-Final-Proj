import TextButton from '../../TextButton/TextButton.jsx';
import styles from '../UnderConstructionPage/UnderConstructionPage.module.css';
import { Link } from "react-router-dom";

function UnderConstructionPage() {

  return(
    <div className={styles.errorPage}>
      Error 404: Page not Found <br></br> or <br></br> Under Construction
      <Link to="/"><TextButton buttonText="Home Page"/></Link>
    </div>
  );
    
}

export default UnderConstructionPage
