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

@Entity("transactions")
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => PlayerTransaction, pt => pt.transaction, {
    nullable: false,
    cascade: true
  })
  playerTransactions: PlayerTransaction[];

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

  async buyer() {
    if (!this.playerTransactions) {
      await this._loadPlayerTransactions();
    }
    return (this.playerTransactions.find(
      pt => !pt.isSeller
    ) as PlayerTransaction).player;
  }

  async seller() {
    if (!this.playerTransactions) {
      await this._loadPlayerTransactions();
    }
    return (this.playerTransactions.find(
      pt => pt.isSeller
    ) as PlayerTransaction).player;
  }

  async updatePlayers() {
    const buyer = await this.buyer();
    const seller = await this.seller();
    await Promise.all([
      buyer.setTotalProfit(),
      buyer.setNumTransactions(),
      seller.setTotalProfit(),
      seller.setNumTransactions()
    ]);
    await Promise.all([buyer.save(), seller.save()]);
  }

  async _loadPlayerTransactions() {
    this.playerTransactions = await PlayerTransaction.find({
      where: { transaction: this },
      relations: ["player"]
    });
  }

  async _updateRound() {
    const round = await this.round;
    round.numTransactions += 1;
    round.averagePrice = await round._setAveragePrice();
    await round.save();
  }
}
