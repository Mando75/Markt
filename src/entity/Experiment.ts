import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Guide } from "./Guide";
import { Scenario } from "./Scenario";
import { Group } from "./Group";
import { generate } from "randomstring";
import { ExperimentPlayer } from "./ExperimentPlayer";
import { ExperimentSession } from "./ExperimentSession";
import { ExperimentStatusEnum } from "../enums/experimentStatus.enum";
import { Round } from "./Round";
import { Transaction } from "./Transaction";
import { User } from "./User";
import { ApolloError } from "apollo-server-express";
import { ExperimentErrorMessages } from "../core/experiment/experimentErrorMessages";

@Entity("experiments")
@Unique("UNIQ_JOIN_CODE", ["active", "joinCode"])
@Index(["active", "id", "guide"])
export class Experiment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Guide, guide => guide.experiments, { nullable: false })
  guide: Guide;

  @ManyToOne(() => Scenario, scenario => scenario.experiments, {
    nullable: false
  })
  scenario: Scenario;

  @ManyToOne(() => Group, group => group.experiments, { nullable: true })
  group: Group | null | undefined;

  @Column({ type: "varchar", length: 8, nullable: false })
  joinCode: string;

  @Column({ type: "integer", nullable: false, default: 0 })
  numPlayers: number;

  @OneToMany(() => ExperimentPlayer, ep => ep.experiment)
  players: ExperimentPlayer[];

  @OneToMany(() => ExperimentSession, es => es.experiment, {
    cascade: false
  })
  sessions: ExperimentSession[];

  @Column({ type: "integer", nullable: false, default: 48 })
  maxPlayerSize: number;

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

  @BeforeInsert()
  setMaxPlayerSize() {
    this.maxPlayerSize = this.scenario.maxPlayerSize;
  }

  /**
   * Returns whether or not the experiment is closed
   * based on if the number of players matches the max player size
   */
  closed() {
    return (
      this.status !== ExperimentStatusEnum.JOINING ||
      this.numPlayers === this.maxPlayerSize
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
    if (this.sessions) {
      return this.sessions.find(session => session.active);
    }
    return await ExperimentSession.findOne({
      where: { experiment: this, active: true },
      cache: true
    });
  }

  /**
   * Returns back the current experiment round
   */
  async getActiveRound() {
    return await Round.createQueryBuilder("r")
      .leftJoin("r.session", "es")
      .where("es.experiment_id IN (:experimentId)", { experimentId: this.id })
      .andWhere("r.active IS TRUE")
      .orderBy("r.end_date", "DESC")
      .cache(true)
      .getOne();
  }

  async getLastRoundSummaryReport() {
    const round = await Round.createQueryBuilder("r")
      .leftJoin("r.session", "es")
      .where("es.experiment_id IN (:experimentId)", { experimentId: this.id })
      .andWhere("r.active IS FALSE")
      .orderBy("r.end_date", "DESC")
      .cache(true)
      .getOne();

    return round ? round.generateRoundSummaryReport() : {};
  }

  async experimentSummaryReport() {
    const players = await this.players;
    const rounds = await Round.createQueryBuilder("r")
      .leftJoin("r.session", "es")
      .where("es.experiment_id IN (:experimentId)", { experimentId: this.id })
      .cache(true)
      .getMany();
    const transactions = await Transaction.createQueryBuilder("t")
      .leftJoin("t.round", "r")
      .where("t.round_id IN (:...roundIds)", {
        roundIds: rounds.map(r => r.id)
      })
      .cache(true)
      .getMany();
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

  static async findAndCheckExperiment(
    id: string,
    user: User | undefined,
    {
      statuses,
      relations
    }: {
      statuses?: Array<ExperimentStatusEnum>;
      relations?: Array<string>;
    } = {}
  ) {
    const guide = user ? user.guide : null;
    const exp = await Experiment.findOne({
      where: { id, active: true, guide },
      relations,
      cache: true
    });
    if (!exp) {
      throw new ApolloError(
        ExperimentErrorMessages.EXPERIMENT_DOES_NOT_EXIST,
        "404"
      );
    }
    if (statuses && !statuses.includes(exp.status)) {
      throw new ApolloError(ExperimentErrorMessages.STATUS_NOT_READY, "403");
    }
    return exp;
  }
}
