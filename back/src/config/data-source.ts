import { DataSource } from "typeorm";
import { User } from "../entities/UsersEntity";
import { Appointment } from "../entities/Appointments";
import { Credentials } from "../entities/Credentials";
import {
  DBHOST,
  DBNAME,
  DBPASSWORD,
  DBPORT,
  DBSYNCHRONIZE,
  DBUSERNAME,
} from "./envs";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DBHOST,
  port: DBPORT,
  username: DBUSERNAME,
  password: DBPASSWORD,
  database: DBNAME,
  synchronize: DBSYNCHRONIZE,
  logging: false,
  entities: [User, Appointment, Credentials],
  subscribers: [],
  migrations: [],
  dropSchema: true,
});
