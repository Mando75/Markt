import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Guide } from "./Guide";
import { Player } from "./Player";

@Entity("groups")
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "boolean", default: true, nullable: false })
  active: boolean;

  @ManyToOne(() => Guide, guide => guide.groups, { nullable: false })
  guide: Promise<Guide>;

  @OneToMany(() => Player, player => player.group, { nullable: true })
  players: Promise<Player>;

  @CreateDateColumn({ nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ nullable: false })
  updatedDate: Date;
}
