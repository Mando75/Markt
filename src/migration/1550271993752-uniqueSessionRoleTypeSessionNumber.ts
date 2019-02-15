import { MigrationInterface, QueryRunner } from "typeorm";

export class uniqueSessionRoleTypeSessionNumber1550271993752
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "session_roles" DROP CONSTRAINT "FK_c5105925e74503e07ce4479189a"`
    );
    await queryRunner.query(
      `ALTER TABLE "session_roles" ALTER COLUMN "scenario_session_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session_roles" ADD CONSTRAINT "UNIQ_SESSION_NUMBER_ROLE_TYPE" UNIQUE ("scenario_session_id", "role_type_id", "session_number")`
    );
    await queryRunner.query(
      `ALTER TABLE "session_roles" ADD CONSTRAINT "FK_c5105925e74503e07ce4479189a" FOREIGN KEY ("scenario_session_id") REFERENCES "scenario_sessions"("id")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "session_roles" DROP CONSTRAINT "FK_c5105925e74503e07ce4479189a"`
    );
    await queryRunner.query(
      `ALTER TABLE "session_roles" DROP CONSTRAINT "UNIQ_SESSION_NUMBER_ROLE_TYPE"`
    );
    await queryRunner.query(
      `ALTER TABLE "session_roles" ALTER COLUMN "scenario_session_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session_roles" ADD CONSTRAINT "FK_c5105925e74503e07ce4479189a" FOREIGN KEY ("scenario_session_id") REFERENCES "scenario_sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
