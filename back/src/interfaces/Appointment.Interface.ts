export interface IAppointment {
  id: number;
  date: Date;
  time: string;
  userId: number;
  status: Status;
}

export enum Status {
  active = "ACTIVE",
  cancelled = "CANCELLED",
}
