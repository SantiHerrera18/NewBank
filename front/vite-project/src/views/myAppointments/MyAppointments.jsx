/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Appointment } from "../../components/Appointment/Appointment";
import Styles from "./Styles.module.css";
import AddAppointment from "../../components/AppointmentForm/addAppointment";
import { useDispatch, useSelector } from "react-redux";
import { getAppointmetns } from "../../redux/userReducer";

const MisTurnos = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user);
  const appointments = useSelector((state) => state.userAppointments);

  useEffect(() => {
    dispatch(getAppointmetns(userId));
  }, []);

  return (
    <>
      <h2 className={Styles.appointmentsTitle}>
        Find all your appointments here
      </h2>
      <div className={Styles.appScreen}>
        <div className={Styles.cardsHolder}>
          {appointments.length ? (
            appointments.map((app, key) => {
              return (
                <Appointment
                  key={key}
                  id={app.id}
                  date={app.date}
                  time={app.time}
                  status={app.status}
                />
              );
            })
          ) : (
            <h2>No appointments to show</h2>
          )}
        </div>
        <AddAppointment />
      </div>
    </>
  );
};

export default MisTurnos;
