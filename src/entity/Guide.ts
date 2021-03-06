import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { User } from "./User";
import { Group } from "./Group";
import { Player } from "./Player";
import { Experiment } from "./Experiment";

@Entity("guides")
export class Guide extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @JoinColumn()
  @OneToOne(() => User, user => user.guide, {
    nullable: false,
    eager: true
  })
  user: User;

  @OneToMany(() => Group, group => group.guide, { nullable: true })
  groups: Promise<Group[]>;

  @OneToMany(() => Player, player => player.guide, { nullable: true })
  players: Promise<Player[]>;

  @OneToMany(() => Experiment, e => e.guide, { nullable: true })
  experiments: Promise<Experiment[]>;

  @Column({ type: "boolean", nullable: false, default: true })
  active: boolean;

  @CreateDateColumn({ nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ nullable: false })
  updatedDate: Date;
}
