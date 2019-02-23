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

  @OneToMany(() => PlayerTransaction, pt => pt.transaction, { eager: true })
  playerTransactions: PlayerTransaction;

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

  /**
 Table transactions {
  id uuid PK
  buyer_id uuid
  seller_id uuid
  round_id uuid
  amount numeric
  buyer_profit numeric
  seller_profit numeric
  created_date timestamp
  updated_date timestamp
}
   */
}
