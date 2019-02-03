import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Scenario } from "./Scenario";
import { SessionRole } from "./SessionRole";

@Entity("role_types")
export class RoleType extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Scenario, scenario => scenario.roleTypes, {
    nullable: false
  })
  scenario: Promise<Scenario>;

  @Column({ type: "varchar", length: 50, nullable: false, unique: true })
  roleTypeId: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @OneToMany(() => SessionRole, sr => sr.roleType)
  sessionRoles: Promise<SessionRole[]>;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
