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

  @JoinColumn()
  @OneToOne(() => User, user => user.guide, {
    nullable: false
  })
  user: Promise<User>;

  @Column({ type: "boolean", nullable: false, default: true })
  active: boolean;

  @CreateDateColumn({ nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ nullable: false })
  updatedDate: Date;
}
