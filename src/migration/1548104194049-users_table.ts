import { MigrationInterface, QueryRunner } from "typeorm";

export class usersTable1548104194049 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    if ((process.env.NODE_ENV = "production"))
      await queryRunner.query("DROP TABLE users");

    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "external_guid" character varying(255), "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" text, "account_type" "users_account_type_enum" NOT NULL, "active" boolean NOT NULL DEFAULT true, "account_locked" boolean NOT NULL DEFAULT false, "accepted_tos" boolean NOT NULL DEFAULT false, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "email_confirmed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ef2fb839248017665e5033e730" ON "users" ("first_name") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0408cb491623b121499d4fa238" ON "users" ("last_name") `
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP INDEX "IDX_97672ac88f789774dd47f7c8be"`);
    await queryRunner.query(`DROP INDEX "IDX_0408cb491623b121499d4fa238"`);
    await queryRunner.query(`DROP INDEX "IDX_ef2fb839248017665e5033e730"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
