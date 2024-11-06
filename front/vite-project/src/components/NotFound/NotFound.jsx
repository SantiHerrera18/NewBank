import { Link } from "react-router-dom";
import Styles from "./Styles.module.css";

const NotFound = () => {
  return (
    <div className={Styles.container}>
      <h1 className={Styles.header}>404 - Page Not Found</h1>
      <p className={Styles.paragraph}>
        The page you're looking for doesn't exist.
      </p>
      <Link to="/home" className={Styles.link}>
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
