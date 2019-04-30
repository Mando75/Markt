import {
  AfterInsert,
  BeforeInsert,
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
import { ExperimentSession } from "./ExperimentSession";
import { Transaction } from "./Transaction";
import { ExperimentStatusEnum } from "../enums/experimentStatus.enum";

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

  @OneToMany(() => Transaction, t => t.round, { cascade: true })
  transactions: Promise<Transaction[]>;

  @Column({ type: "integer", nullable: false, default: 0 })
  numTransactions: number;

  @Column({ type: "timestamp", nullable: true })
  endDate: Date | undefined;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  _loadedTransactions: Transaction[] | undefined;

  async _loadTransactions() {
    if (!this._loadedTransactions) {
      this._loadedTransactions = await this.transactions;
    }
    return this._loadedTransactions;
  }

  async generateRoundSummaryReport() {
    const transactions = await this._loadTransactions();
    transactions.sort((a, b) => {
      if (a.amount < b.amount) {
        return 1;
      } else if (a.amount > b.amount) {
        return -1;
      }
      return 0;
    });
    return {
      transactions,
      numTransactions: this.numTransactions,
      averagePrice: this.averagePrice,
      minPrice: await this.minPrice(),
      maxPrice: await this.maxPrice()
    };
  }

  async minPrice() {
    const transactions = await this.transactions;
    if (transactions.length === 0) {
      return 0;
    }
    return Math.min(...transactions.map(t => t.amount));
  }

  async maxPrice() {
    const transactions = await this._loadTransactions();
    if (transactions.length === 0) {
      return 0;
    }
    return Math.max(...transactions.map(t => t.amount));
  }

  async _setAveragePrice() {
    const transactions = await this.transactions;
    if (transactions.length === 0) {
      this.averagePrice = 0;
      return 0;
    }
    this.averagePrice =
      transactions.reduce(
        (accum: number, t: Transaction) => accum + t.amount,
        0
      ) / transactions.length;
    return this.averagePrice;
  }

  async _setNumTransactions() {
    this.numTransactions = (await this.transactions).length;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async updateRoundMeta() {
    await Promise.all([this._setAveragePrice(), this._setNumTransactions()]);
  }

  @BeforeUpdate()
  _setEndDate() {
    if (!this.active && !this.endDate) {
      this.endDate = new Date();
    }
  }

  @AfterInsert()
  async _updateExperimentStatus() {
    const session = await this.session;
    const experiment = await session.experiment;
    await experiment.updateStatus(ExperimentStatusEnum.IN_ROUND);
  }
}
