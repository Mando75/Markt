import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from "typeorm";
import { Guide } from "./Guide";
import { Group } from "./Group";
import { generate } from "randomstring";
import { ExperimentPlayer } from "./ExperimentPlayer";

@Entity("players")
@Unique("UNIQ_PLAYER_CODE", ["playerCode", "active", "guide"])
@Unique("UNIQ_PLAYER_IN_GROUP", ["active", "group", "guide", "email"])
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Guide, guide => guide.players, { nullable: false })
  guide: Promise<Guide>;

  @ManyToOne(() => Group, group => group.players, { nullable: true })
  group: Group | undefined;

  @OneToMany(() => ExperimentPlayer, ep => ep.player)
  experimentPlayers: Promise<ExperimentPlayer[]>;

  @Column({ type: "varchar", length: 6, nullable: false })
  playerCode: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  email: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  firstName: string | null | undefined;

  @Column({ type: "varchar", length: 255, nullable: true })
  lastName: string | null | undefined;

  @Column({ type: "boolean", default: true, nullable: false })
  active: boolean;

  @Column({ type: "boolean", default: false, nullable: false })
  acceptedTos: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  /**
   * We need to create a player code that is unique
   * to the guide's active players
   */
  @BeforeInsert()
  async createPlayerCode() {
    let goodOption = false;
    let option = "";
    while (!goodOption) {
      option = generate({
        length: 6,
        charset: "alphanumeric",
        readable: true,
        capitalization: "uppercase"
      });
      const existingCode = await Player.findOne({
        where: { playerCode: option, active: true, guide: this.guide },
        select: ["id"]
      });
      if (!existingCode) goodOption = true;
    }
    this.playerCode = option;
  }
}
