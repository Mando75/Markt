import { MigrationInterface, QueryRunner } from "typeorm";

export class scenarioSession1549093288397 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "scenario_sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "scenario_session_id" character varying(50) NOT NULL, "session_number" integer NOT NULL, "instructions_json" jsonb NOT NULL DEFAULT '[{}]', "round_discussion_points_json" jsonb NOT NULL DEFAULT '[{}]', "number_of_rounds" integer NOT NULL DEFAULT 1, "scenario_id" uuid NOT NULL, CONSTRAINT "UQ_7dc268bb2c7e4478215ec278170" UNIQUE ("scenario_session_id"), CONSTRAINT "PK_2f765e6adcfea2857ac2817bb47" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "scenario_sessions" ADD CONSTRAINT "FK_794f9ac7ebf3cc04d034939356d" FOREIGN KEY ("scenario_id") REFERENCES "scenarios"("id")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "scenario_sessions" DROP CONSTRAINT "FK_794f9ac7ebf3cc04d034939356d"`
    );
    await queryRunner.query(`DROP TABLE "scenario_sessions"`);
  }
}
