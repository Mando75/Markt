import {
  AfterLoad,
  BaseEntity,
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
import { Experiment } from "./Experiment";
import { Player } from "./Player";
import { RoleType } from "./RoleType";
import { PlayerTransaction } from "./PlayerTransaction";
import { Transaction } from "./Transaction";

@Entity("experiment_players")
export class ExperimentPlayer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Experiment, ex => ex.players, { nullable: false })
  experiment: Promise<Experiment>;

  @ManyToOne(() => Player, p => p.experimentPlayers, { nullable: false })
  player: Player;

  @ManyToOne(() => RoleType, rt => rt.players, { nullable: false })
  roleType: Promise<RoleType>;

  @Column({ type: "integer", nullable: false, default: 0 })
  numTransactions: number;

  @OneToMany(() => PlayerTransaction, pt => pt.player, { eager: true })
  playerTransactions: PlayerTransaction[];

  // Set by _loadTransactions
  transactions: Transaction[];

  buyerTransactions() {
    return this.playerTransactions
      ? this.playerTransactions.filter(pt => !pt.isSeller)
      : [];
  }

  sellerTransactions() {
    return this.playerTransactions
      ? this.playerTransactions.filter(pt => pt.isSeller)
      : [];
  }

  @Column({ type: "float", nullable: false, default: 0.0 })
  totalProfit: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @AfterLoad()
  _loadTransactions() {
    this.transactions = this.playerTransactions
      ? this.playerTransactions.map(pt => pt.transaction)
      : [];
  }

  @BeforeInsert()
  @BeforeUpdate()
  _setNumTransactions() {
    this.numTransactions = this.playerTransactions
      ? this.playerTransactions.length
      : 0;
  }

  @BeforeInsert()
  @BeforeUpdate()
  _setTotalProfit() {
    const sellerProfit = this.sellerTransactions().reduce(
      (accum: number, pt: PlayerTransaction) =>
        accum + pt.transaction.sellerProfit,
      0
    );
    const buyerProfit = this.buyerTransactions().reduce(
      (accum: number, pt: PlayerTransaction) =>
        accum + pt.transaction.buyerProfit,
      0
    );
    this.totalProfit = sellerProfit + buyerProfit;
  }

  @BeforeInsert()
  async _updateExperimentPlayerCount() {
    const ex = await this.experiment;
    ex.numPlayers += 1;
    await ex.save();
  }
}
