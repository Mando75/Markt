import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
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
import { Round } from "./Round";

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

  @OneToMany(() => ExperimentSession, es => es.experiment, {
    cascade: false
  })
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
        readable: true,
        capitalization: "uppercase"
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

  async updateStatus(newStatus: ExperimentStatusEnum) {
    this.status = newStatus;
    return await this.save();
  }

  /**
   * Returns back the current experiment session
   */
  async getActiveSession() {
    const sessions = await this.sessions;
    if (sessions) {
      return sessions.find(s => s.active);
    } else {
      return await ExperimentSession.findOne({
        where: { experiment: this, active: true }
      });
    }
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

  async experimentSummaryReport() {
    const players = await this.players;
    const rounds = await Round.createQueryBuilder("r")
      .leftJoin("r.session", "es")
      .where("es.experiment_id IN (:experimentId)", { experimentId: this.id })
      .getMany();
    const transactions = (await Promise.all(
      rounds.map(r => r.transactions)
    )).flat();
    players.sort((a, b) => {
      const ap = a.totalProfit;
      const bp = b.totalProfit;
      if (ap < bp) {
        return 1;
      } else if (ap > bp) {
        return -1;
      }
      return 0;
    });
    return {
      players,
      transactions,
      numTransactions: transactions.length
    };
  }

  @BeforeUpdate()
  _setEndDate() {
    if (!this.active && !this.endDate) {
      this.endDate = new Date();
    }
  }
}
