import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Scenario } from "./Scenario";
import { SessionRole } from "./SessionRole";
import { ExperimentPlayer } from "./ExperimentPlayer";

@Entity("role_types")
export class RoleType extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Scenario, scenario => scenario.roleTypes, {
    nullable: false
  })
  scenario: Promise<Scenario>;

  @Column({ type: "varchar", length: 50, nullable: false, unique: true })
  roleTypeId: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @OneToMany(() => SessionRole, sr => sr.roleType)
  sessionRoles: Promise<SessionRole[]>;

  @OneToMany(() => ExperimentPlayer, ep => ep.roleType)
  players: Promise<ExperimentPlayer[]>;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
