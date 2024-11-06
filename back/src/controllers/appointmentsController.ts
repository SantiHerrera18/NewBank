import { Request, Response } from "express";
import { AppointmentScheduleDTO } from "../dto/appointmentDTO";
import {
  cancelAppointmentService,
  getAppointmentByIdService,
  getAppointmentService,
  scheduleAppointmentService,
} from "../services/appointmentService";
import { catchingError } from "../utils/catchingError";
import { Appointment } from "../entities/Appointments";

//? Controlador para obtener todos los turnos
const getAppointmentsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result: Appointment[] | string = await getAppointmentService();
  res.status(200).json({
    message: "Obtener el listado de todas las citas de todos los turnos",
    data: result,
  });
};

//? Controlador para obtener un turno por ID
const getAppointmentByIdController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const result = await getAppointmentByIdService(parseInt(id, 10));
  res.status(200).json({
    message: "Obtener el detalle de una cita específica",
    data: result,
  });
};

//? Controlador para agendar un nuevo turno
const scheduleAppointmentController = async (
  req: Request<unknown, unknown, AppointmentScheduleDTO>,
  res: Response
): Promise<void> => {
  const result = await scheduleAppointmentService(req.body);
  res.status(200).json({
    message: "Appointment scheduled succesfully",
    data: result,
  });
};

//? Controlador para cancelar un turno
const cancelAppointmentController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const result = await cancelAppointmentService(parseInt(id));
  res.status(200).json({
    message: "Appointment has been cancelled.",
    data: result,
  });
};

const appointmentsControllers = {
  getAppointmentsController: catchingError(getAppointmentsController),
  getAppointmentByIdController: catchingError(getAppointmentByIdController),
  scheduleAppointmentController: catchingError(scheduleAppointmentController),
  cancelAppointmentController: catchingError(cancelAppointmentController),
};

export default appointmentsControllers;
