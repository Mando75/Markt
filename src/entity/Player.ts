import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Guide } from "./Guide";
import { Group } from "./Group";

@Entity("players")
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Guide, guide => guide.players, { nullable: false })
  guide: Guide;

  @ManyToOne(() => Group, group => group.players, { nullable: true })
  group: Group | undefined;

  @Column({ type: "varchar", length: 6, nullable: false })
  playerCode: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  email: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  firstName: string | null | undefined;

  @Column({ type: "varchar", length: 255, nullable: true })
  lastName: string | null | undefined;

  @Column({ type: "boolean", default: true, nullable: false })
  active: boolean;

  @Column({ type: "boolean", default: false, nullable: false })
  acceptedTos: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
