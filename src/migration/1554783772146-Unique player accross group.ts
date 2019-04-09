import { MigrationInterface, QueryRunner } from "typeorm";

export class UniquePlayerAccrossGroup1554783772146
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "players" ADD CONSTRAINT "UNIQ_PLAYER_IN_GROUP" UNIQUE ("active", "group_id", "guide_id", "email")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "players" DROP CONSTRAINT "UNIQ_PLAYER_IN_GROUP"`
    );
  }
}
