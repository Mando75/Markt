import { MigrationInterface, QueryRunner } from "typeorm";

export class addUpdatedColumns1549093288400 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "scenario_sessions" ADD "updated_date" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "scenario_sessions" ADD "created_date" TIMESTAMP NOT NULL DEFAULT now()`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "scenario_sessions" DROP COLUMN "created_date"`
    );
    await queryRunner.query(
      `ALTER TABLE "scenario_sessions" DROP COLUMN "updated_date"`
    );
  }
}
