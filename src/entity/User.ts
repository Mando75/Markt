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
  AfterLoad
} from "typeorm";
import { hash } from "bcrypt";
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
  @Column({ type: "varchar", length: 255 })
  firstName: string;

  @Index()
  @Column({ type: "varchar", length: 255 })
  lastName: string;

  fullName: string;

  @AfterLoad()
  setFullName() {
    this.fullName = this.firstName + " " + this.lastName;
  }

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

  @OneToOne(() => Guide, guide => guide.user)
  guide: Promise<Guide>;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) this.password = await hash(this.password, 10);
  }
}
