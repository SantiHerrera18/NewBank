import moment, { Moment } from "moment";
import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointments";
import CustomError from "../utils/customError";

export const AppointmentRepository = AppDataSource.getRepository(
  Appointment
).extend({
  validateAppointment: async function (
    userId: number,
    date: Moment,
    time: string
  ): Promise<void> {
    if (typeof userId !== "number") {
      throw new CustomError(400, "Cannot schedule appointment");
    }
    const appointmentChecked = await this.findOneBy({
      user: { id: userId },
      date,
      time,
    });

    if (appointmentChecked)
      throw new CustomError(
        400,
        `Cannot schedule appointment, you already have another appointment on ${date.format("YYYY-MM-DD")} at ${time}`
      );
  },

  validateAppById: async function (id: number): Promise<Appointment> {
    const appointment = await this.findOneBy({ id });
    if (appointment) return appointment;
    else throw new CustomError(404, `Appointment with id ${id} doesn't exist`);
  },

  checkDate: function (date: Moment): void {
    if (date.day() === 0 || date.day() === 6)
      throw new CustomError(400, "Cannot schedule appointments on weekends");
  },

  validateTime: function (time: string): void {
    const newTime: Moment = moment(time, "HH:mm");
    const timeBefore: Moment = moment("08:00", "HH:mm");
    const timeAfter: Moment = moment("18:00", "HH:mm");
    const today: Moment = moment("HH:mm");

    if (newTime.isBefore(today))
      throw new CustomError(400, "Cannot schedule appointments for past times");

    if (newTime.isBefore(timeBefore) || newTime.isAfter(timeAfter))
      throw new CustomError(400, "Schedule time must be among 08:00 and 18:00");
  },
});
