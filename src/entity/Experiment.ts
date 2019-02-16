import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from "typeorm";
import { Guide } from "./Guide";
import { Scenario } from "./Scenario";
import { Group } from "./Group";
import { generate } from "randomstring";

@Entity("experiments")
@Unique("UNIQ_JOIN_CODE", ["active", "joinCode"])
export class Experiment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Guide, guide => guide.experiments, { nullable: false })
  guide: Promise<Guide>;

  @ManyToOne(() => Scenario, scenario => scenario.experiments, {
    nullable: false,
    eager: true
  })
  scenario: Scenario;

  @ManyToOne(() => Group, group => group.experiments, { nullable: false })
  group: Group;

  @Column({ type: "varchar", length: 8, nullable: false })
  joinCode: string;

  @Column({ type: "integer", nullable: false, default: 0 })
  numPlayers: number;

  @Column({ type: "boolean", nullable: false, default: true })
  active: boolean;

  @Column({ type: "timestamp", nullable: true })
  endDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  /**
   * We need to create a join code that is unique to the active experiments
   */
  @BeforeInsert()
  async createJoinCode() {
    let goodOption = false;
    let option = "";
    while (!goodOption) {
      option = generate({
        length: 6,
        charset: "alphanumeric",
        readable: true
      });
      const existingCode = await Experiment.findOne({
        where: { joinCode: option, active: true },
        select: ["id"]
      });
      if (!existingCode) goodOption = true;
    }
    this.joinCode = option;
  }
}
