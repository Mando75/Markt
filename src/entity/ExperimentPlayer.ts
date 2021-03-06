import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
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
import { SessionRole } from "./SessionRole";

@Entity("experiment_players")
export class ExperimentPlayer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Experiment, ex => ex.players, { nullable: false })
  experiment: Promise<Experiment>;

  @ManyToOne(() => Player, p => p.experimentPlayers, {
    nullable: false
  })
  player: Promise<Player>;

  @ManyToOne(() => RoleType, rt => rt.players, { nullable: false })
  roleType: Promise<RoleType>;

  @Column({ type: "integer", nullable: false, default: 0 })
  numTransactions: number;

  @OneToMany(() => PlayerTransaction, pt => pt.player, {
    cascade: true,
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
    if (!this._playerTransactions) {
      this._playerTransactions = await this.playerTransactions;
    }
    return this._playerTransactions.filter(pt => !pt.isSeller);
  }

  async sellerTransactions() {
    if (!this._playerTransactions) {
      this._playerTransactions = await this.playerTransactions;
    }
    return this._playerTransactions.filter(pt => pt.isSeller);
  }

  @Column({ type: "float", nullable: false, default: 0.0 })
  totalProfit: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @AfterLoad()
  async _loadTransactions() {
    const pts = await this.playerTransactions;
    const trans = pts ? pts.map(pt => pt.transaction) : [];
    this._transactions = await Promise.all(trans);
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
    const sellerTransactions = await Promise.all(sts.map(st => st.transaction));
    const buyerTransactions = await Promise.all(bts.map(bt => bt.transaction));
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

  async getPlayerCode() {
    const player = await this.player;
    return player.playerCode;
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
