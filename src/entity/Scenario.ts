import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("scenarios")
export class Scenario extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 10, unique: true, nullable: false })
  scenario_code: string;

  @Column({ type: "integer", nullable: false })
  max_player_size: number;

  @Column({ type: "integer", nullable: false })
  session_count: number;

  @Column({ type: "text", nullable: true, default: "No Description Provided" })
  description: string;
}
