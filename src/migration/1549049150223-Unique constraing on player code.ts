import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueConstraingOnPlayerCode1549049150223
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "players" ADD CONSTRAINT "UNIQ_PLAYER_CODE" UNIQUE ("player_code", "active", "guide_id")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "players" DROP CONSTRAINT "UNIQ_PLAYER_CODE"`
    );
  }
}
