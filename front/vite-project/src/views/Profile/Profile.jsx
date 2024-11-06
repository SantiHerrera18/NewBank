import { Link } from "react-router-dom";
import Styles from "./Styles.module.css";
import { useDispatch } from "react-redux";
import { setLogout } from "../../redux/userReducer";

const Profile = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setLogout());
  };
  return (
    <div className={Styles.content}>
      <Link className={Styles.logout} to="/" onClick={handleClick}>
        LOGOUT
      </Link>
    </div>
  );
};

export default Profile;
