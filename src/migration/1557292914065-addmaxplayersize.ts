import { MigrationInterface, QueryRunner } from "typeorm";

export class addmaxplayersize1557292914065 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE INDEX "IDX_432d9499d46a45a3b2a0ae87bb" ON "experiments" ("id", "active", "guide_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "experiments" ADD "max_player_size" integer NOT NULL DEFAULT 48`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP INDEX "IDX_432d9499d46a45a3b2a0ae87bb"`);
    await queryRunner.query(
      `ALTER TABLE "experiments" DROP COLUMN "max_player_size"`
    );
  }
}
