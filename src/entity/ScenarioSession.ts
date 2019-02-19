import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Scenario } from "./Scenario";
import { SessionRole } from "./SessionRole";

@Entity("scenario_sessions")
export class ScenarioSession extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Scenario, scen => scen.scenarioSessions, { nullable: false })
  scenario: Promise<Scenario>;

  @Column({ type: "varchar", length: 50, nullable: false, unique: true })
  scenarioSessionId: string;

  @Column({ type: "integer", nullable: false })
  sessionNumber: number;

  @Column({ type: "jsonb", nullable: false, default: [{}] })
  instructions: Array<ScenarioSchema.Instructions>;

  @Column({ type: "jsonb", nullable: false, default: [{}] })
  roundDiscussionPoints: Array<ScenarioSchema.Instructions>;

  @Column({ type: "integer", nullable: false, default: 1 })
  numberOfRounds: number;

  @OneToMany(() => SessionRole, sr => sr.scenarioSession)
  sessionRoles: Promise<SessionRole[]>;
}
