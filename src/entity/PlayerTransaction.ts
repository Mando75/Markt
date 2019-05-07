import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { ExperimentPlayer } from "./ExperimentPlayer";
import { Transaction } from "./Transaction";

@Entity("player_transactions")
@Unique("ONLY_TWO_RECORDS_PER_TRANSACTION", ["transaction", "isSeller"])
export class PlayerTransaction extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => ExperimentPlayer, ep => ep.playerTransactions, {
    nullable: false
  })
  player: Promise<ExperimentPlayer>;

  @ManyToOne(() => Transaction, t => t.playerTransactions, {
    nullable: false
  })
  transaction: Promise<Transaction>;

  @Column({ type: "boolean", nullable: false, default: false })
  isSeller: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
