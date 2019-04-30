import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity("institutions")
export class Institution extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "boolean", nullable: false, default: true })
  active: boolean;

  @OneToMany(() => User, user => user.institution, {
    nullable: true
  })
  users: Promise<User[]>;

  @CreateDateColumn({ nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ nullable: false })
  updatedDate: Date;
}
