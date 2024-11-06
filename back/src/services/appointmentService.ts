import { AppointmentScheduleDTO } from "../dto/appointmentDTO";
import { Appointment } from "../entities/Appointments";
import { Status } from "../interfaces/Appointment.Interface";
import { AppointmentRepository } from "../repositories/AppointmentRepository";
import CustomError from "../utils/customError";
import { getUserByIdService } from "./userService";
import moment, { Moment } from "moment";

//? Función para obtener todos los turnos
export const getAppointmentService = async (): Promise<
  Appointment[] | string
> => {
  const result: Appointment[] = await AppointmentRepository.find();
  return result;
};

//? Función para obtener un turno por su ID
export const getAppointmentByIdService = async (
  id: number
): Promise<Appointment | null> => {
  const appointmentFound: Appointment | null =
    await AppointmentRepository.validateAppById(id);
  return appointmentFound;
};

//? Función para agendar un nuevo turno
export const scheduleAppointmentService = async (
  app: AppointmentScheduleDTO
): Promise<Appointment> => {
  await getUserByIdService(app.userId);
  const specificDate: Moment = moment(app.date, "YYYY-MM-DD");

  await AppointmentRepository.validateAppointment(
    app.userId,
    specificDate,
    app.time
  );
  AppointmentRepository.validateTime(app.time);
  AppointmentRepository.checkDate(specificDate);
  const newAppointment: Appointment = AppointmentRepository.create({
    date: specificDate,
    time: app.time,
    user: { id: app.userId },
  });

  await AppointmentRepository.save(newAppointment);
  return newAppointment;
};

//? Función para cambiar el estado del turno
export const cancelAppointmentService = async (
  id: number
): Promise<Appointment> => {
  const appointmentFound: Appointment =
    await AppointmentRepository.validateAppById(id);
  if (appointmentFound.status === Status.cancelled)
    throw new CustomError(400, "Appointment has been already cancelled");
  appointmentFound.status = Status.cancelled;
  await AppointmentRepository.save(appointmentFound);
  return appointmentFound;
};
