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
import { ExperimentSession } from "./ExperimentSession";
import { Transaction } from "./Transaction";

@Entity("rounds")
export class Round extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => ExperimentSession, es => es.rounds)
  session: Promise<ExperimentSession>;

  @Column({ type: "integer", nullable: false })
  roundNumber: number;

  @Column({ type: "boolean", nullable: false, default: true })
  active: boolean;

  @Column({ type: "float", nullable: false, default: 0.0 })
  averagePrice: number;

  @OneToMany(() => Transaction, t => t.round)
  transactions: Promise<Transaction[]>;

  @Column({ type: "integer", nullable: false, default: 0 })
  numTransactions: number;

  @Column({ type: "timestamp", nullable: true })
  endDate: Date | undefined;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
