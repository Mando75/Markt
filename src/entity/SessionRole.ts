import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { RoleType } from "./RoleType";
import { ScenarioSession } from "./ScenarioSession";
import { Unique } from "typeorm";

@Entity("session_roles")
@Unique("UNIQ_SESSION_NUMBER_ROLE_TYPE", [
  "scenarioSession",
  "roleType",
  "sessionNumber"
])
export class SessionRole extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => RoleType, rt => rt.sessionRoles, { nullable: false })
  roleType: Promise<RoleType>;

  @ManyToOne(() => ScenarioSession, ss => ss.sessionRoles, { nullable: false })
  scenarioSession: Promise<ScenarioSession>;

  @Column({ type: "integer", nullable: false })
  sessionNumber: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "float", nullable: false })
  value: number;

  @Column({ type: "boolean", nullable: false, default: false })
  allowSell: boolean;

  @Column({ type: "jsonb", nullable: false, default: [{}] })
  instructions: ScenarioSchema.Instructions[];

  @Column({ type: "varchar", length: 255, nullable: false })
  profitEquation: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
