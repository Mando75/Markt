import { MigrationInterface, QueryRunner } from "typeorm";

export class ExperimentEntity1550284839556 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "experiments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "join_code" character varying(8) NOT NULL, "num_players" integer NOT NULL DEFAULT 0, "active" boolean NOT NULL DEFAULT true, "end_date" TIMESTAMP, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "guide_id" uuid NOT NULL, "scenario_id" uuid NOT NULL, "group_id" uuid NOT NULL, CONSTRAINT "UNIQ_JOIN_CODE" UNIQUE ("active", "join_code"), CONSTRAINT "PK_aafe1321d916fac58ba06ad8178" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "experiments" ADD CONSTRAINT "FK_a1dfd5dc94529235b78eb0a3419" FOREIGN KEY ("guide_id") REFERENCES "guides"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "experiments" ADD CONSTRAINT "FK_466a6c73ef04ce13adb5d4a2547" FOREIGN KEY ("scenario_id") REFERENCES "scenarios"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "experiments" ADD CONSTRAINT "FK_600674e048095f9aa4ef506e432" FOREIGN KEY ("group_id") REFERENCES "groups"("id")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "experiments" DROP CONSTRAINT "FK_600674e048095f9aa4ef506e432"`
    );
    await queryRunner.query(
      `ALTER TABLE "experiments" DROP CONSTRAINT "FK_466a6c73ef04ce13adb5d4a2547"`
    );
    await queryRunner.query(
      `ALTER TABLE "experiments" DROP CONSTRAINT "FK_a1dfd5dc94529235b78eb0a3419"`
    );
    await queryRunner.query(`DROP TABLE "experiments"`);
  }
}
