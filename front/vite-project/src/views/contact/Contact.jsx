import { useFormik } from "formik";
import "./Styles.css";
import { validateContact } from "../../helpers/validation";

const Contact = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validate: validateContact,
    onSubmit: (values) => {
      console.log("Form data:", values);
    },
  });

  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>
      <form className="contact-form" onSubmit={formik.handleSubmit}>
        <div className="contact-input">
          <label>
            {" "}
            Name
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}
          </label>
        </div>

        <div className="contact-input">
          <label>
            Email
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </label>
        </div>

        <div className="contact-input">
          <label>
            {" "}
            Message
            <textarea
              id="message"
              name="message"
              onChange={formik.handleChange}
              value={formik.values.message}
            />
            {formik.errors.message ? (
              <div className="error">{formik.errors.message}</div>
            ) : null}
          </label>
        </div>

        <button className="contact-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
