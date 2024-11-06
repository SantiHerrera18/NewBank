import { useState } from "react";
import Styles from "./Appointment.module.css";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { cancelAppointment } from "../../redux/userReducer";

export const Appointment = ({ id, date, time, status }) => {
  const [appStatus, setAppStatus] = useState(status);

  const dispatch = useDispatch();
  const handleOnClick = async () => {
    try {
      await dispatch(cancelAppointment(id)).unwrap();
      Swal.fire({
        title: "SUCCESS",
        text: "Appointment has been cancelled succesfully",
      });
      setAppStatus("CANCELLED");
    } catch (error) {
      Swal.fire({
        title: "ERROR",
        text: "Cannot cancel appointment, try again",
      });
    }
  };

  return (
    <div className={Styles.appointmentCard}>
      <button
        className={
          appStatus === "CANCELLED"
            ? Styles.statusButtonCancel
            : Styles.statusButton
        }
        onClick={handleOnClick}
        disabled={appStatus === "CANCELLED"}
      >
        {appStatus}
      </button>
      <h3>
        N°<span className={Styles.appInfo}> {id}</span>{" "}
      </h3>
      <h3>
        Date: <span className={Styles.appInfo}>{date}</span>
      </h3>
      <h3>
        Time: <span className={Styles.appInfo}>{time}</span>
      </h3>
    </div>
  );
};
