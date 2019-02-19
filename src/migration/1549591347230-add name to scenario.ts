import { MigrationInterface, QueryRunner } from "typeorm";

export class addNameToScenario1549591347230 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "scenarios" ADD "name" character varying(255) NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "scenarios" DROP COLUMN "name"`);
  }
}
