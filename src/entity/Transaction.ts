import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  AfterLoad
} from "typeorm";
import { PlayerTransaction } from "./PlayerTransaction";
import { Round } from "./Round";
import { ExperimentPlayer } from "./ExperimentPlayer";

@Entity("transactions")
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => PlayerTransaction, pt => pt.transaction, {
    eager: true,
    nullable: false
  })
  playerTransactions: PlayerTransaction[];

  @ManyToOne(() => Round, r => r.transactions)
  round: Promise<Round>;

  @Column({ type: "float", nullable: false, default: 0.0 })
  amount: number;

  @Column({ type: "float", nullable: false, default: 0.0 })
  buyerProfit: number;

  @Column({ type: "float", nullable: false, default: 0.0 })
  sellerProfit: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  // buyer and seller are set by _loadBuyerSeller
  buyer: ExperimentPlayer;

  seller: ExperimentPlayer;

  @AfterLoad()
  _loadBuyerSeller() {
    const buyerSearch = this.playerTransactions.find(
      (pt: PlayerTransaction) => !pt.isSeller
    );
    const sellerSearch = this.playerTransactions.find(
      (pt: PlayerTransaction) => pt.isSeller
    );
    if (buyerSearch && sellerSearch) {
      this.buyer = buyerSearch.player;
      this.seller = sellerSearch.player;
    } else {
      throw new Error("Missing player buyer or seller on transaction");
    }
  }
}
