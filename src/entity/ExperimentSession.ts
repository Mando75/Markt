import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Experiment } from "./Experiment";
import { ScenarioSession } from "./ScenarioSession";
import { Round } from "./Round";

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
}