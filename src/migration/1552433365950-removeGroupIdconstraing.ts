import { MigrationInterface, QueryRunner } from "typeorm";

export class removeGroupIdconstraing1552433365950
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "experiments" DROP CONSTRAINT "FK_600674e048095f9aa4ef506e432"`
    );
    await queryRunner.query(
      `ALTER TABLE "experiments" ALTER COLUMN "group_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "experiments" ADD CONSTRAINT "FK_600674e048095f9aa4ef506e432" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "experiments" DROP CONSTRAINT "FK_600674e048095f9aa4ef506e432"`
    );
    await queryRunner.query(
      `ALTER TABLE "experiments" ALTER COLUMN "group_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "experiments" ADD CONSTRAINT "FK_600674e048095f9aa4ef506e432" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
