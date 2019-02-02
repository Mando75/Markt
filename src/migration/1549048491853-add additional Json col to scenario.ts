import { MigrationInterface, QueryRunner } from "typeorm";

export class addAdditionalJsonColToScenario1549048491853
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "scenarios" ADD "instructions_json" jsonb NOT NULL DEFAULT '[{}]'`
    );
    await queryRunner.query(
      `ALTER TABLE "scenarios" ADD "role_distribution_json" jsonb NOT NULL DEFAULT '[{}]'`
    );
    await queryRunner.query(
      `ALTER TABLE "scenarios" ADD "created_date" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "scenarios" ADD "updated_date" TIMESTAMP NOT NULL DEFAULT now()`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "scenarios" DROP COLUMN "updated_date"`
    );
    await queryRunner.query(
      `ALTER TABLE "scenarios" DROP COLUMN "created_date"`
    );
    await queryRunner.query(
      `ALTER TABLE "scenarios" DROP COLUMN "role_distribution_json"`
    );
    await queryRunner.query(
      `ALTER TABLE "scenarios" DROP COLUMN "instructions_json"`
    );
  }
}
