import Styles from "./LoginForm.module.css";
import { useFormik } from "formik";
import { validateLogin } from "../../helpers/validation";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/userReducer";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: validateLogin,
    onSubmit: async (values) => {
      try {
        await dispatch(loginUser(values)).unwrap();
        Swal.fire({
          title: "User logged succesfully",
        });
        navigate("/");
      } catch (error) {
        Swal.fire({
          title: error.response.data.details,
          text: "Try again",
        });
      }
    },
  });

  return (
    <>
      <form className={Styles.formLogin} onSubmit={formik.handleSubmit}>
        <label>
          Username{" "}
          <input
            type="text"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.errors.username && formik.touched.username ? (
            <div className={Styles.validation}>{formik.errors.username}</div>
          ) : null}
        </label>
        <label>
          Password{" "}
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className={Styles.validation}>{formik.errors.password}</div>
          ) : null}
        </label>
        <button className={Styles.loginButton} type="submit">
          LogIn
        </button>
        <div>
          <p>
            Don't have an account?{" "}
            <Link className={Styles.registerButton} to="/register">
              Register
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
