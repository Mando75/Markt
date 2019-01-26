import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "./User";

@Entity("guides")
export class Guide extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => User, user => user.guide, {
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
}
