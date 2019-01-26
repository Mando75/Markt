import { MigrationInterface, QueryRunner } from "typeorm";

export class GuideTable1548459541929 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "guides" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL DEFAULT true, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "REL_49737dc54aaa90c42f048dabe8" UNIQUE ("user_id"), CONSTRAINT "PK_8de34e682c2201d625cf95c1266" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "guides" ADD CONSTRAINT "FK_49737dc54aaa90c42f048dabe89" FOREIGN KEY ("user_id") REFERENCES "users"("id")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "guides" DROP CONSTRAINT "FK_49737dc54aaa90c42f048dabe89"`
    );
    await queryRunner.query(`DROP TABLE "guides"`);
  }
}
