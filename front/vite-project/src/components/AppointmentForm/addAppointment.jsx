import { useFormik } from "formik";
import Styles from "./Styles.module.css";
import { validateScheduleAppointment } from "../../helpers/validation";
import { useDispatch, useSelector } from "react-redux";
import { scheduleAppointment } from "../../redux/userReducer";
import Swal from "sweetalert2";

const AddAppointment = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      date: "",
      time: "",
    },
    validate: validateScheduleAppointment,
    onSubmit: async (values) => {
      try {
        const scheduleData = { ...values, userId };
        await dispatch(scheduleAppointment(scheduleData)).unwrap();
        Swal.fire({
          title: "SUCCESS",
          text: "Appointment scheduled sucessfully",
        });
      } catch (error) {
        Swal.fire({
          title: "ERROR",
          text: error.response.data.details,
        });
      }
    },
  });

  return (
    <>
      <form className={Styles.addAppForm} onSubmit={formik.handleSubmit}>
        <h2 className={Styles.addFormTitle}>Schedule AddAppointment</h2>
        <label>
          {" "}
          Date
          <input
            type="date"
            name="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date}
          />
          {formik.errors.date && formik.touched.date ? (
            <div className={Styles.validation}>{formik.errors.date}</div>
          ) : null}
        </label>
        <label>
          {" "}
          Time
          <input
            type="time"
            name="time"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.time}
          />
          {formik.errors.time && formik.touched.time ? (
            <div className={Styles.validation}>{formik.errors.time}</div>
          ) : null}
        </label>
        <button
          className={Styles.addAppButton}
          type="submit"
          disabled={
            Object.keys(formik.errors).length > 0 || !formik.values.date
          }
        >
          Schedule
        </button>
      </form>
    </>
  );
};

export default AddAppointment;
