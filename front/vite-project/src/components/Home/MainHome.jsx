import { useSelector } from "react-redux";
import Styles from "./Styles.module.css";
import { Link } from "react-router-dom";

const MainHome = () => {
  const userId = useSelector((state) => state.user);
  //   const handleLocation = () => {
  //     if (userId) return "/";
  //     else return "/login";
  //   };
  return (
    <div className={Styles.background}>
      <header className={Styles.header}>
        <h1 className={Styles.mainTitle}>WELCOME USER</h1>
        <h3 className={Styles.mainDescription}>
          At EBank, we put the user at the heart of everything we do. We offer a
          personalized experience, allowing you to schedule appointments online
          at your convenience, with complete flexibility and ease. Your time and
          satisfaction are our top priorities.{" "}
          <Link className={Styles.login} to={userId ? "/" : "/login"}>
            Login
          </Link>{" "}
          to start!
        </h3>
      </header>
    </div>
  );
};

export default MainHome;
