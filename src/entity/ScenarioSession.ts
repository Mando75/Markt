import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Scenario } from "./Scenario";

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
  instructionsJson: string;

  instructions: any;

  @AfterLoad()
  hydrateJson() {
    this.instructions = JSON.parse(this.instructionsJson);
  }

  @BeforeInsert()
  dehydrateJson() {
    this.instructionsJson = JSON.stringify(this.instructions);
  }
}
