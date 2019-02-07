import { MigrationInterface, QueryRunner } from "typeorm";

export class testJson1548795054051 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "scenarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "scenario_code" character varying(10) NOT NULL, "max_player_size" integer NOT NULL, "session_count" integer NOT NULL, "description" text DEFAULT 'No Description Provided', "overview_json" jsonb NOT NULL DEFAULT '[{}]', CONSTRAINT "UQ_d557311e12c1e1718615f4e6ddc" UNIQUE ("scenario_code"), CONSTRAINT "PK_a2af4912aab626639cca306b987" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "scenarios"`);
  }
}
