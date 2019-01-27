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

@Entity("guides")
export class Guide extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @JoinColumn()
  @OneToOne(() => User, user => user.guide, {
    nullable: false
  })
  user: Promise<User>;

  @OneToMany(() => Group, group => group.guide, { nullable: true })
  groups: Promise<Group[]>;

  @OneToMany(() => Player, player => player.guide, { nullable: true })
  players: Promise<Player>;

  @Column({ type: "boolean", nullable: false, default: true })
  active: boolean;

  @CreateDateColumn({ nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ nullable: false })
  updatedDate: Date;
}
