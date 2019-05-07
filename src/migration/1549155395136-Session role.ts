import { MigrationInterface, QueryRunner } from "typeorm";

export class SessionRole1549155395136 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "session_roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "session_number" integer NOT NULL, "name" character varying(255) NOT NULL, "value" double precision NOT NULL, "allow_sell" boolean NOT NULL DEFAULT false, "instructions_json" jsonb NOT NULL DEFAULT '[{}]', "profit_equation" character varying(255) NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "role_type_id" uuid NOT NULL, "scenario_session_id" uuid, CONSTRAINT "PK_1d456165df2b81d327addf758a0" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "session_roles" DROP COLUMN "value"`);
    await queryRunner.query(
      `ALTER TABLE "session_roles" ADD "value" float NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session_roles" ADD CONSTRAINT "FK_176821f39ac7355226a95daf37e" FOREIGN KEY ("role_type_id") REFERENCES "role_types"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "session_roles" ADD CONSTRAINT "FK_c5105925e74503e07ce4479189a" FOREIGN KEY ("scenario_session_id") REFERENCES "scenario_sessions"("id")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "session_roles" DROP CONSTRAINT "FK_c5105925e74503e07ce4479189a"`
    );
    await queryRunner.query(
      `ALTER TABLE "session_roles" DROP CONSTRAINT "FK_176821f39ac7355226a95daf37e"`
    );
    await queryRunner.query(`DROP TABLE "session_roles"`);
  }
}
