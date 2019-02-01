import {
  AfterLoad,
  BaseEntity,
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

  overview: any;

  @Column({ type: "jsonb", nullable: false, default: [{}] })
  instructionsJson: string;

  instructions: any;

  @Column({ type: "jsonb", nullable: false, default: [{}] })
  roleDistributionJson: string;

  roleDistribution: any;

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
}
