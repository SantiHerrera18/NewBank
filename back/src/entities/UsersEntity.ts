import {
  Column,
  // CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  // UpdateDateColumn,
} from "typeorm";
import { Credentials } from "./Credentials";
import { Appointment } from "./Appointments";

@Entity({
  name: "users",
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 20, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 50, nullable: false, unique: true })
  email: string;

  @Column({ type: "date", nullable: false })
  birthdate: Date;

  @Column({ type: "integer", nullable: false, unique: true })
  nDni: number;

  @OneToOne(() => Credentials, { cascade: true })
  @JoinColumn()
  credentials: Credentials;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  @JoinColumn()
  appointments: Appointment[];

  // @CreateDateColumn()
  // createdAt?: Date;

  // @UpdateDateColumn()
  // updatedAt?: Date;
}
