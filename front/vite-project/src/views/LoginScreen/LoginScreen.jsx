import Styles from "./LoginScreen.module.css";
import LoginForm from "../../components/LoginForm/LoginForm";

const loginScreen = () => {
  return (
    <div className={Styles.background}>
      <div className={Styles.loginScreen}>
        <h1 className={Styles.mainTitle}>
          WELCOME TO <span>EBANK</span>
        </h1>
        <div>
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  );
};

export default loginScreen;
