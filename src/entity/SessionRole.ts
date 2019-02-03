import {
  AfterLoad,
  AfterUpdate,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { RoleType } from "./RoleType";
import { ScenarioSession } from "./ScenarioSession";
import { ScenarioSchema } from "../types/ScenarioSchema";

@Entity("session_roles")
export class SessionRole extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => RoleType, rt => rt.sessionRoles, { nullable: false })
  roleType: RoleType;

  @ManyToOne(() => ScenarioSession, ss => ss.sessionRoles)
  scenarioSession: ScenarioSession;

  @Column({ type: "integer", nullable: false })
  sessionNumber: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "float", nullable: false })
  value: number;

  @Column({ type: "boolean", nullable: false, default: false })
  allowSell: boolean;

  @Column({ type: "jsonb", nullable: false, default: [{}] })
  instructionsJson: string;

  instructions: ScenarioSchema.Instructions[];

  @Column({ type: "varchar", length: 255, nullable: false })
  profitEquation: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @AfterLoad()
  @AfterUpdate()
  hydrateJson() {
    this.instructions = JSON.parse(this.instructionsJson);
  }

  @BeforeInsert()
  @BeforeUpdate()
  dehydrateJson() {
    this.instructionsJson = JSON.stringify(this.instructions);
  }

  constructor(props: ScenarioSchema.SessionRole) {
    super();
    if (props) {
      this.sessionNumber = props.sessionNumber;
      this.name = props.name;
      this.value = props.value;
      this.allowSell = props.allowSell;
      this.instructions = props.instructions;
      this.profitEquation = props.profitEquation;
    }
  }
}
