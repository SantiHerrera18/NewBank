import Styles from "./Navbar.module.css";
import profileImg from "../../assets/UserProfile.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const userId = useSelector((state) => state.user);
  return (
    <>
      <div className={Styles.navbar}>
        <div className={Styles.navLinks}>
          <li>
            <Link className={Styles.link} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={Styles.link} to="/about">
              About us
            </Link>
          </li>
          <li>
            <Link className={Styles.link} to="/contact">
              Contact
            </Link>
          </li>
          <li>
            {userId ? (
              <Link className={Styles.link} to="/appointments">
                Appointments
              </Link>
            ) : null}
          </li>
        </div>
        <div className={Styles.profileImg}>
          {userId ? (
            <Link to="/profile">
              <img src={profileImg} alt="profile" />
            </Link>
          ) : (
            <Link to="/login">
              <img src={profileImg} alt="profile" />
            </Link>
          )}
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Navbar;
