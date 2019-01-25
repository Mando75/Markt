import { MigrationInterface, QueryRunner } from "typeorm";

export class institutionEntity1548129421140 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "institutions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "active" boolean NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0be7539dcdba335470dc05e9690" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "institution_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_822972ceea1fda0973b8acc7bbe" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_822972ceea1fda0973b8acc7bbe"`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "institution_id"`);
    await queryRunner.query(`DROP TABLE "institutions"`);
  }
}
