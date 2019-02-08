import {
  // AfterLoad,
  // AfterUpdate,
  BaseEntity,
  // BeforeInsert,
  // BeforeUpdate,
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

  // @AfterLoad()
  // @AfterUpdate()
  // hydrateJson() {
  //   this.overview = JSON.parse(this.overviewJson);
  //   this.instructions = JSON.parse(this.instructionsJson);
  //   this.roleDistribution = this.roleDistributionJson;
  // }
  //
  // @BeforeInsert()
  // @BeforeUpdate()
  // dehydrateJson() {
  //   this.overviewJson = JSON.stringify(this.overview);
  //   this.instructionsJson = JSON.stringify(this.instructions);
  //   this.roleDistributionJson = this.roleDistribution;
  // }

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
