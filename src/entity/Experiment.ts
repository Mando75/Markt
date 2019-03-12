import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from "typeorm";
import { Guide } from "./Guide";
import { Scenario } from "./Scenario";
import { Group } from "./Group";
import { generate } from "randomstring";
import { ExperimentPlayer } from "./ExperimentPlayer";
import { ExperimentSession } from "./ExperimentSession";
import { ExperimentStatusEnum } from "../enums/experimentStatus.enum";

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

  @ManyToOne(() => Group, group => group.experiments, { nullable: true })
  group: Promise<Group | null | undefined>;

  @Column({ type: "varchar", length: 8, nullable: false })
  joinCode: string;

  @Column({ type: "integer", nullable: false, default: 0 })
  numPlayers: number;

  @OneToMany(() => ExperimentPlayer, ep => ep.experiment)
  players: Promise<ExperimentPlayer[]>;

  @OneToMany(() => ExperimentSession, es => es.experiment)
  sessions: Promise<ExperimentSession[]>;

  @Column({ type: "boolean", nullable: false, default: true })
  active: boolean;

  @Column("enum", {
    enum: ExperimentStatusEnum,
    nullable: false,
    default: ExperimentStatusEnum.JOINING
  })
  status: ExperimentStatusEnum;

  @Column({ type: "timestamp", nullable: true })
  endDate: Date | undefined;

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

  /**
   * Returns whether or not the experiment is closed
   * based on if the number of players matches the max player size
   */
  closed() {
    return (
      this.status !== ExperimentStatusEnum.JOINING ||
      this.numPlayers === this.scenario.maxPlayerSize
    );
  }

  /**
   * Returns back the current experiment session
   */
  async getActiveSession() {
    const sessions = await this.sessions;
    if (sessions) {
      return sessions.find(s => s.active);
    }
    return null;
  }

  /**
   * Returns back the current experiment round
   */
  async getActiveRound() {
    const activeSession = await this.getActiveSession();
    if (activeSession) {
      return await activeSession.getActiveRound();
    }
    return null;
  }
}
