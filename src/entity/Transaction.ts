import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn
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

  @ManyToOne(() => Round, r => r.transactions, { nullable: false })
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

  _buyer: ExperimentPlayer | undefined;

  buyer() {
    if (!this._buyer) {
      const buyer = this.playerTransactions.find(
        pt => !pt.isSeller
      ) as PlayerTransaction;
      this._buyer = buyer.player;
    }
    return this._buyer;
  }

  _seller: ExperimentPlayer | undefined;

  seller() {
    if (!this._seller) {
      const seller = this.playerTransactions.find(
        pt => pt.isSeller
      ) as PlayerTransaction;
      this._seller = seller.player;
    }
    return this._seller;
  }
}
