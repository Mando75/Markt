import {
  AfterLoad,
  AfterUpdate,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
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
  instructionsJson: string;

  instructions: Array<ScenarioSchema.Instructions>;

  @Column({ type: "jsonb", nullable: false, default: [{}] })
  roundDiscussionPointsJson: string;

  roundDiscussionPoints: Array<ScenarioSchema.Instructions>;

  @Column({ type: "integer", nullable: false, default: 1 })
  numberOfRounds: number;

  @OneToMany(() => SessionRole, sr => sr.scenarioSession)
  sessionRoles: Promise<SessionRole[]>;

  @AfterLoad()
  @AfterUpdate()
  hydrateJson() {
    this.instructions = JSON.parse(this.instructionsJson);
    this.roundDiscussionPoints = JSON.parse(this.roundDiscussionPointsJson);
  }

  @BeforeInsert()
  @BeforeUpdate()
  dehydrateJson() {
    this.instructionsJson = JSON.stringify(this.instructions);
    this.roundDiscussionPointsJson = JSON.stringify(this.roundDiscussionPoints);
  }

  constructor(props: ScenarioSchema.ScenarioSession) {
    super();
    if (props) {
      this.scenarioSessionId = props.scenarioSessionId;
      this.sessionNumber = props.sessionNumber;
      this.instructions = props.instructions;
      this.roundDiscussionPoints = props.roundDiscussionPoints;
      this.numberOfRounds = props.numberOfRounds;
    }
  }
}
