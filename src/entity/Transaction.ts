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
    nullable: false,
    cascade: true
  })
  playerTransactions: Promise<PlayerTransaction[]>;

  @ManyToOne(() => Round, r => r.transactions, {
    nullable: false
  })
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

  async buyer() {
    if (!this._buyer) {
      await this._loadPlayerTransactions();
      const pts = await this.playerTransactions;
      const buyer = pts.find(pt => !pt.isSeller) as PlayerTransaction;
      this._buyer = await buyer.player;
    }
    return this._buyer;
  }

  _seller: ExperimentPlayer | undefined;

  async seller() {
    if (!this._seller) {
      await this._loadPlayerTransactions();
      const pts = await this.playerTransactions;
      const seller = pts.find(pt => pt.isSeller) as PlayerTransaction;
      this._seller = await seller.player;
    }
    return this._seller;
  }

  async updatePlayers() {
    const buyer = await this.buyer();
    const seller = await this.seller();
    await Promise.all([buyer.reload(), seller.reload()]);
    await Promise.all([
      buyer.setTotalProfit(),
      buyer.setNumTransactions(),
      seller.setTotalProfit(),
      seller.setNumTransactions()
    ]);
    await Promise.all([buyer.save(), seller.save()]);
  }

  async _loadPlayerTransactions() {
    const pt = await this.playerTransactions;
    if (pt.length === 0) {
      this.playerTransactions = Promise.resolve(
        await PlayerTransaction.find({
          where: { transaction: this }
        })
      );
    }
  }

  async _updateRound() {
    const round = await this.round;
    round.numTransactions += 1;
    round.averagePrice = await round._setAveragePrice();
    await round.save();
  }
}
