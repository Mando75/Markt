import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Experiment } from "./Experiment";
import { Player } from "./Player";
import { RoleType } from "./RoleType";

@Entity("experiment_players")
export class ExperimentPlayer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Experiment, ex => ex.players, { nullable: false })
  experiment: Promise<Experiment>;

  @ManyToOne(() => Player, p => p.experimentPlayers, { nullable: false })
  player: Promise<Player>;

  @ManyToOne(() => RoleType, rt => rt.players, { nullable: false })
  roleType: Promise<RoleType>;

  @Column({ type: "integer", nullable: false, default: 0 })
  numTransactions: number;

  @Column({ type: "float", nullable: false, default: 0.0 })
  totalProfit: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}

/**
 Table experiment_players {
  id uuid PK
  experiment_id uuid
  player_id uuid
  role_type_id uuid
  num_transactions integer
  total_profit numeric
} */
