import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("experiment_players")
export class ExperimentPlayer extends BaseEntity {
  @PrimaryGeneratedColumn("uui")
  id: string;
}
