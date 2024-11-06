import RegisterForm from "../../components/RegisterForm/RegisterForm";
import Styles from "./Styles.module.css";

const RegisterScreen = () => {
  return (
    <div className={Styles.background}>
      <h2 className={Styles.registerTitle}>
        JOIN TO <span className={Styles.ebank}>EBANK</span> TEAM!
      </h2>
      <RegisterForm />
    </div>
  );
};

export default RegisterScreen;
