import { MigrationInterface, QueryRunner } from "typeorm";

export class ExperimentPlayer1550894170277 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "experiment_players" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "num_transactions" integer NOT NULL DEFAULT 0, "total_profit" double precision NOT NULL DEFAULT 0, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "experiment_id" uuid NOT NULL, "player_id" uuid NOT NULL, "role_type_id" uuid NOT NULL, CONSTRAINT "PK_2288c3ed91f577497b8fede2b67" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "experiment_players" ADD CONSTRAINT "FK_856d7baac90f6d1af25c37d1685" FOREIGN KEY ("experiment_id") REFERENCES "experiments"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "experiment_players" ADD CONSTRAINT "FK_cf5f234564677334d9b49b76af2" FOREIGN KEY ("player_id") REFERENCES "players"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "experiment_players" ADD CONSTRAINT "FK_7106e9c01a6e96afaa4653feb12" FOREIGN KEY ("role_type_id") REFERENCES "role_types"("id")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "experiment_players" DROP CONSTRAINT "FK_7106e9c01a6e96afaa4653feb12"`
    );
    await queryRunner.query(
      `ALTER TABLE "experiment_players" DROP CONSTRAINT "FK_cf5f234564677334d9b49b76af2"`
    );
    await queryRunner.query(
      `ALTER TABLE "experiment_players" DROP CONSTRAINT "FK_856d7baac90f6d1af25c37d1685"`
    );
    await queryRunner.query(`DROP TABLE "experiment_players"`);
  }
}
