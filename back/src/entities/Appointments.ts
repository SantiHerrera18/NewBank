import {
  Column,
  // CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  // UpdateDateColumn,
} from "typeorm";
import { Status } from "../interfaces/Appointment.Interface";
import { User } from "./UsersEntity";
import { Moment } from "moment";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date", nullable: false })
  date: Moment;

  @Column({ type: "varchar", nullable: false })
  time: string;

  @ManyToOne(() => User, (user) => user.appointments)
  @JoinColumn()
  user: User;

  @Column({ type: "varchar", default: Status.active })
  status: Status;

  // @CreateDateColumn()
  // createdAt: Date;

  // @UpdateDateColumn()
  // uptadedAt: Date;
}
