import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { RoleType } from "./RoleType";
import { ScenarioSession } from "./ScenarioSession";

@Entity("scenarios")
export class Scenario extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 10, unique: true, nullable: false })
  scenarioCode: string;

  @Column({ type: "integer", nullable: false })
  maxPlayerSize: number;

  @Column({ type: "integer", nullable: false })
  sessionCount: number;

  @Column({ type: "text", nullable: true, default: "No Description Provided" })
  description: string;

  @Column({ type: "jsonb", nullable: false, default: [{}] })
  overview: Array<ScenarioSchema.SessionOverview>;

  @Column({ type: "jsonb", nullable: false, default: [{}] })
  instructions: Array<ScenarioSchema.Instructions>;

  @Column({ type: "jsonb", nullable: false, default: [{}] })
  roleDistribution: Array<string>;

  @OneToMany(() => RoleType, role => role.scenario)
  roleTypes: Promise<RoleType[]>;

  @OneToMany(() => ScenarioSession, ss => ss.scenario)
  scenarioSessions: Promise<ScenarioSession[]>;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
