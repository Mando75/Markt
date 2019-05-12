import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Experiment } from "./Experiment";
import { Player } from "./Player";
import { RoleType } from "./RoleType";
import { PlayerTransaction } from "./PlayerTransaction";
import { Transaction } from "./Transaction";
import { SessionRole } from "./SessionRole";

@Entity("experiment_players")
export class ExperimentPlayer extends BaseEntity {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Experiment, ex => ex.players, { nullable: false })
  experiment: Promise<Experiment>;

  @ManyToOne(() => Player, p => p.experimentPlayers, {
    nullable: false
  })
  player: Player;

  @ManyToOne(() => RoleType, rt => rt.players, { nullable: false })
  roleType: Promise<RoleType>;

  @Column({ type: "integer", nullable: false, default: 0 })
  numTransactions: number;

  @Column({ type: "varchar", length: 6, nullable: false })
  playerCode: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  firstName: string | null | undefined;

  @Column({ type: "varchar", length: 255, nullable: true })
  lastName: string | null | undefined;

  @OneToMany(() => PlayerTransaction, pt => pt.player, {
    lazy: true
  })
  playerTransactions: Promise<PlayerTransaction[]>;

  // Set by _loadTransactions
  _transactions: Transaction[] | undefined;

  async transactions() {
    if (!this._transactions) {
      await this._loadTransactions();
    }
    return this._transactions;
  }

  _playerTransactions: PlayerTransaction[] | undefined;
  async buyerTransactions() {
    return await PlayerTransaction.find({
      where: { player: this, isSeller: false },
      relations: ["transaction"]
    });
  }

  async sellerTransactions() {
    return await PlayerTransaction.find({
      where: { player: this, isSeller: true },
      relations: ["transaction"]
    });
  }

  @Column({ type: "float", nullable: false, default: 0.0 })
  totalProfit: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  async _loadTransactions() {
    if (this._transactions) {
      return this._transactions;
    }
    return await Transaction.createQueryBuilder("t")
      .leftJoin("t.playerTransactions", "pt")
      .where("pt.player_id = ");
  }

  async setNumTransactions() {
    const pts = await this.playerTransactions;
    this.numTransactions = pts ? pts.length : 0;
  }

  async setTotalProfit() {
    const [sts, bts] = await Promise.all([
      this.sellerTransactions(),
      this.buyerTransactions()
    ]);
    const sellerTransactions = sts.map(st => st.transaction);
    const buyerTransactions = bts.map(bt => bt.transaction);
    const sellerProfit = sellerTransactions.reduce(
      (accum: number, curr: Transaction) => accum + curr.sellerProfit,
      0
    );
    const buyerProfit = buyerTransactions.reduce(
      (accum: number, curr: Transaction) => accum + curr.buyerProfit,
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

  @BeforeInsert()
  async inheritPlayerData() {
    this.playerCode = this.player.playerCode;
    this.firstName = this.player.firstName;
    this.lastName = this.player.lastName;
  }

  async getCurrentSessionRole() {
    const [ex, role] = await Promise.all([this.experiment, this.roleType]);
    const [currentSession, sessionRoles] = await Promise.all([
      ex.getActiveSession(),
      role.sessionRoles
    ]);
    if (!currentSession) {
      return sessionRoles.find(sr => sr.sessionNumber === 1) as SessionRole;
    } else {
      return sessionRoles.find(
        sr => sr.sessionNumber === currentSession.sessionNumber
      ) as SessionRole;
    }
  }

  async getProfitEquation() {
    const sr = await this.getCurrentSessionRole();
    return sr.profitEquation;
  }

  async getProfit(amount: number) {
    return eval(
      (await this.getProfitEquation())
        .replace("$", "")
        .replace("P", amount.toString())
    );
  }
}
