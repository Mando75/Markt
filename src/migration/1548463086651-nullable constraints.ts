import { MigrationInterface, QueryRunner } from "typeorm";

export class nullableConstraints1548463086651 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "institutions" ALTER COLUMN "active" SET DEFAULT true`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "first_name" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "last_name" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "guides" DROP CONSTRAINT "FK_49737dc54aaa90c42f048dabe89"`
    );
    await queryRunner.query(
      `ALTER TABLE "guides" ALTER COLUMN "user_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "guides" ADD CONSTRAINT "FK_49737dc54aaa90c42f048dabe89" FOREIGN KEY ("user_id") REFERENCES "users"("id")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "guides" DROP CONSTRAINT "FK_49737dc54aaa90c42f048dabe89"`
    );
    await queryRunner.query(
      `ALTER TABLE "guides" ALTER COLUMN "user_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "guides" ADD CONSTRAINT "FK_49737dc54aaa90c42f048dabe89" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "last_name" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "first_name" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "institutions" ALTER COLUMN "active" DROP DEFAULT`
    );
  }
}
