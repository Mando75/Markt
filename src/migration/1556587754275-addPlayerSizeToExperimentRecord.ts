import { MigrationInterface, QueryRunner } from "typeorm";

export class addPlayerSizeToExperimentRecord1556587754275
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "experiments" ADD "max_player_size" integer NOT NULL DEFAULT 48`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_432d9499d46a45a3b2a0ae87bb" ON "experiments" ("active", "id", "guide_id") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP INDEX "IDX_432d9499d46a45a3b2a0ae87bb"`);
    await queryRunner.query(
      `ALTER TABLE "experiments" DROP COLUMN "max_player_size"`
    );
  }
}
