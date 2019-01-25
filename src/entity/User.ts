import {
  Entity,
  Index,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";
import { hash } from "bcrypt";
import { AccountType } from "../enums/accountType.enum";
import { Institution } from "./Institution";

@Entity("users")
export class User extends BaseEntity {
  constructor() {
    super();
    this.fullName = this.firstName + " " + this.lastName;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  externalGuid: string;

  @Index()
  @Column({ type: "varchar", length: 255 })
  firstName: string;

  @Index()
  @Column({ type: "varchar", length: 255 })
  lastName: string;

  @Index({ unique: true })
  @Column("varchar", { length: 255 })
  email: string;

  @Column("text", { nullable: true })
  password: string | null;

  @Column("enum", { enum: AccountType })
  accountType: AccountType;

  @Column("boolean", { default: true })
  active: boolean;

  @Column("boolean", { default: false })
  accountLocked: boolean;

  @Column("boolean", { default: false })
  acceptedTos: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column({ type: "boolean", default: false })
  emailConfirmed: boolean;

  @ManyToOne(() => Institution, institution => institution.users)
  institution: Institution;

  fullName: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) this.password = await hash(this.password, 10);
  }
}
