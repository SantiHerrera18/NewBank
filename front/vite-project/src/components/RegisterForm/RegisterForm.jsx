import Styles from "./Styles.module.css";
import { useFormik } from "formik";
import { validateRegister } from "../../helpers/validation";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      birthdate: "",
      nDni: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validate: validateRegister,
    onSubmit: (values) => {
      axios
        .post("http://localhost:3000/users/register", values)
        .then((res) => {
          Swal.fire({
            title: "User registered sucessfully",
          });
          navigate("/login");
        })
        .catch((error) => {
          Swal.fire({
            title: error.response.data.details,
          });
        });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={Styles.registerForm}>
        <div className={Styles.inputContainer}>
          <label>
            {" "}
            Name
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name ? (
              <div className={Styles.validation}>{formik.errors.name}</div>
            ) : null}
          </label>

          <label>
            {" "}
            Email
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className={Styles.validation}>{formik.errors.email}</div>
            ) : null}
          </label>
          <label>
            {" "}
            Birthdate
            <input
              type="date"
              name="birthdate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.birthdate}
            />
            {formik.errors.birthdate && formik.touched.birthdate ? (
              <div className={Styles.validation}>{formik.errors.birthdate}</div>
            ) : null}
          </label>
          <label>
            {" "}
            Dni Number
            <input
              type="number"
              name="nDni"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nDni}
            />
            {formik.errors.nDni && formik.touched.nDni ? (
              <div className={Styles.validation}>{formik.errors.nDni}</div>
            ) : null}
          </label>
        </div>
        <div className={Styles.inputContainer}>
          <label>
            {" "}
            Username
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
            {" "}
            Password
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
          <label>
            {" "}
            Confirm password
            <input
              type="password"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
              <div className={Styles.validation}>
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </label>
          <button className={Styles.registerButton} type="submit">
            REGISTER
          </button>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
