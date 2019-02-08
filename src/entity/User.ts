import {
  Entity,
  Index,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  AfterLoad,
  AfterUpdate
} from "typeorm";
import { hash } from "bcryptjs";
import { AccountType } from "../enums/accountType.enum";
import { Institution } from "./Institution";
import { Guide } from "./Guide";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  externalGuid: string;

  @Index()
  @Column({ type: "varchar", length: 255, nullable: true })
  firstName: string;

  @Index()
  @Column({ type: "varchar", length: 255, nullable: true })
  lastName: string;

  fullName: string;

  @AfterLoad()
  @AfterUpdate()
  setFullName() {
    this.fullName = this.firstName + " " + this.lastName;
  }

  @Index({ unique: true })
  @Column("varchar", { length: 255, nullable: false })
  email: string;

  @Column("text", { nullable: true })
  password: string | null;

  @Column("enum", { enum: AccountType, nullable: false })
  accountType: AccountType;

  @Column("boolean", { default: true, nullable: false })
  active: boolean;

  @Column("boolean", { default: false, nullable: false })
  accountLocked: boolean;

  @Column("boolean", { default: false, nullable: false })
  acceptedTos: boolean;

  @CreateDateColumn({ nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ nullable: false })
  updatedDate: Date;

  @Column({ type: "boolean", default: false, nullable: false })
  emailConfirmed: boolean;

  @ManyToOne(() => Institution, institution => institution.users, {
    nullable: true
  })
  institution: Institution;

  @OneToOne(() => Guide, guide => guide.user, { nullable: true })
  guide: Promise<Guide>;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) this.password = await hash(this.password, 10);
  }
}
