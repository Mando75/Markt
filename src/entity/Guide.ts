import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  AfterLoad
} from "typeorm";
import { User } from "./User";

@Entity("guides")
export class Guide extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => User, {
    eager: true
  })
  @JoinColumn()
  user: User;

  @Column({ type: "boolean", default: true })
  active: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  firstName: string;
  lastName: string;
  fullName: string;
  email: string;

  @AfterLoad()
  setUserAttributes() {
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.fullName = this.user.lastName;
  }
}
