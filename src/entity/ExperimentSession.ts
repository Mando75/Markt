import {
  AfterInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Experiment } from "./Experiment";
import { ScenarioSession } from "./ScenarioSession";
import { Round } from "./Round";
import { ExperimentStatusEnum } from "../enums/experimentStatus.enum";

@Entity("experiment_sessions")
export class ExperimentSession extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Experiment, e => e.sessions, { nullable: false })
  experiment: Promise<Experiment>;

  @ManyToOne(() => ScenarioSession, ss => ss.experimentSessions, {
    nullable: false
  })
  scenarioSession: Promise<ScenarioSession>;

  @OneToMany(() => Round, r => r.session)
  rounds: Promise<Round[]>;

  @Column({ type: "integer", nullable: false })
  sessionNumber: number;

  @Column({ type: "boolean", nullable: false, default: true })
  active: boolean;

  @Column({ type: "timestamp", nullable: true })
  endDate: Date | undefined;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @BeforeUpdate()
  _setEndDate() {
    if (!this.active && !this.endDate) {
      this.endDate = new Date();
    }
  }

  @AfterInsert()
  async _updateExperimentStatus() {
    const experiment = await this.experiment;
    await experiment.updateStatus(ExperimentStatusEnum.SESSION_START);
  }

  /**
   * Returns the current round
   */
  async getActiveRound() {
    return await Round.createQueryBuilder("r")
      .where("r.session_id IN (:sessionId)", { sessionId: this.id })
      .andWhere("r.active IS TRUE")
      .orderBy("r.end_date", "DESC")
      .cache(true)
      .getOne();
  }

  async ranRounds() {
    return await Round.createQueryBuilder("r")
      .where("r.session_id IN (:esId)", { esId: this.id })
      .cache(true)
      .getCount();
  }
}
