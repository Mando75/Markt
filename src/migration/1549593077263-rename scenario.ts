import { MigrationInterface, QueryRunner } from "typeorm";

export class renameScenario1549593077263 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "scenarios" DROP COLUMN "overview_json"`
    );
    await queryRunner.query(
      `ALTER TABLE "scenarios" DROP COLUMN "instructions_json"`
    );
    await queryRunner.query(
      `ALTER TABLE "scenarios" DROP COLUMN "role_distribution_json"`
    );
    await queryRunner.query(
      `ALTER TABLE "scenarios" ADD "overview" jsonb NOT NULL DEFAULT '[{}]'`
    );
    await queryRunner.query(
      `ALTER TABLE "scenarios" ADD "instructions" jsonb NOT NULL DEFAULT '[{}]'`
    );
    await queryRunner.query(
      `ALTER TABLE "scenarios" ADD "role_distribution" jsonb NOT NULL DEFAULT '[{}]'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "scenarios" DROP COLUMN "role_distribution"`
    );
    await queryRunner.query(
      `ALTER TABLE "scenarios" DROP COLUMN "instructions"`
    );
    await queryRunner.query(`ALTER TABLE "scenarios" DROP COLUMN "overview"`);
    await queryRunner.query(
      `ALTER TABLE "scenarios" ADD "role_distribution_json" jsonb NOT NULL DEFAULT '[{}]'`
    );
    await queryRunner.query(
      `ALTER TABLE "scenarios" ADD "instructions_json" jsonb NOT NULL DEFAULT '[{}]'`
    );
    await queryRunner.query(
      `ALTER TABLE "scenarios" ADD "overview_json" jsonb NOT NULL DEFAULT '[{}]'`
    );
  }
}
