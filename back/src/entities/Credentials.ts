import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Credentials {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50, unique: true, nullable: false })
  username: string;

  @Column({ type: "varchar", length: 150, nullable: false })
  password: string;
}
