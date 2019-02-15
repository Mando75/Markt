import { MigrationInterface, QueryRunner } from "typeorm";

export class removeUneededJsonFields1549594120803
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "session_roles" RENAME COLUMN "instructions_json" TO "instructions"`
    );
    await queryRunner.query(
      `ALTER TABLE "scenario_sessions" DROP COLUMN "instructions_json"`
    );
    await queryRunner.query(
      `ALTER TABLE "scenario_sessions" DROP COLUMN "round_discussion_points_json"`
    );
    await queryRunner.query(
      `ALTER TABLE "scenario_sessions" ADD "instructions" jsonb NOT NULL DEFAULT '[{}]'`
    );
    await queryRunner.query(
      `ALTER TABLE "scenario_sessions" ADD "round_discussion_points" jsonb NOT NULL DEFAULT '[{}]'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "scenario_sessions" DROP COLUMN "round_discussion_points"`
    );
    await queryRunner.query(
      `ALTER TABLE "scenario_sessions" DROP COLUMN "instructions"`
    );
    await queryRunner.query(
      `ALTER TABLE "scenario_sessions" ADD "round_discussion_points_json" jsonb NOT NULL DEFAULT '[{}]'`
    );
    await queryRunner.query(
      `ALTER TABLE "scenario_sessions" ADD "instructions_json" jsonb NOT NULL DEFAULT '[{}]'`
    );
    await queryRunner.query(
      `ALTER TABLE "session_roles" RENAME COLUMN "instructions" TO "instructions_json"`
    );
  }
}
