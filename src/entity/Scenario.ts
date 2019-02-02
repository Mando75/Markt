import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity("scenarios")
export class Scenario extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 10, unique: true, nullable: false })
  scenarioCode: string;

  @Column({ type: "integer", nullable: false })
  maxPlayerSize: number;

  @Column({ type: "integer", nullable: false })
  sessionCount: number;

  @Column({ type: "text", nullable: true, default: "No Description Provided" })
  description: string;

  @Column({ type: "jsonb", nullable: false, default: [{}] })
  overviewJson: string;

  overview: Array<ScenarioSchema.SessionOverview>;

  @Column({ type: "jsonb", nullable: false, default: [{}] })
  instructionsJson: string;

  instructions: Array<ScenarioSchema.Instructions>;

  @Column({ type: "jsonb", nullable: false, default: [{}] })
  roleDistributionJson: string;

  roleDistribution: Array<string>;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @AfterLoad()
  hydrateJson() {
    this.overview = JSON.parse(this.overviewJson);
    this.instructions = JSON.parse(this.instructionsJson);
    this.roleDistribution = JSON.parse(this.roleDistributionJson);
  }

  @BeforeInsert()
  dehydrateJson() {
    this.overviewJson = JSON.stringify(this.overview);
    this.instructionsJson = JSON.stringify(this.instructions);
    this.roleDistributionJson = JSON.stringify(this.roleDistribution);
  }

  constructor(def: ScenarioSchema.Scenario) {
    super();
    if (def) {
      this.scenarioCode = def.scenarioCode;
      this.maxPlayerSize = def.maxPlayerSize;
      this.sessionCount = def.sessionCount;
      this.overview = def.overview;
      this.description = def.description;
      this.instructions = def.instructions;
      this.roleDistribution = def.roleDistribution;
    }
  }
}
