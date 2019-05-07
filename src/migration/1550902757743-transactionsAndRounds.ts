import { MigrationInterface, QueryRunner } from "typeorm";

export class transactionsAndRounds1550902757743 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "player_transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_seller" boolean NOT NULL DEFAULT false, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "player_id" uuid NOT NULL, "transaction_id" uuid NOT NULL, CONSTRAINT "ONLY_TWO_RECORDS_PER_TRANSACTION" UNIQUE ("transaction_id", "is_seller"), CONSTRAINT "PK_658f64e44283ced56c09ca7a8cc" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" double precision NOT NULL DEFAULT 0, "buyer_profit" double precision NOT NULL DEFAULT 0, "seller_profit" double precision NOT NULL DEFAULT 0, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "round_id" uuid, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "rounds" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "round_number" integer NOT NULL, "active" boolean NOT NULL DEFAULT true, "average_price" double precision NOT NULL DEFAULT 0, "num_transactions" integer NOT NULL DEFAULT 0, "end_date" TIMESTAMP, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "session_id" uuid, CONSTRAINT "PK_9d254884a20817016e2f877c7e7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "amount"`);
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD "amount" float NOT NULL DEFAULT 0`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP COLUMN "buyer_profit"`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD "buyer_profit" float NOT NULL DEFAULT 0`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP COLUMN "seller_profit"`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD "seller_profit" float NOT NULL DEFAULT 0`
    );
    await queryRunner.query(`ALTER TABLE "rounds" DROP COLUMN "average_price"`);
    await queryRunner.query(
      `ALTER TABLE "rounds" ADD "average_price" float NOT NULL DEFAULT 0`
    );
    await queryRunner.query(
      `CREATE TABLE "experiment_sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "session_number" integer NOT NULL, "active" boolean NOT NULL DEFAULT true, "end_date" TIMESTAMP, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "experiment_id" uuid NOT NULL, "scenario_session_id" uuid NOT NULL, CONSTRAINT "PK_f844d600cf1131466a103779cb4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "player_transactions" ADD CONSTRAINT "FK_058b8668561921969da077b0799" FOREIGN KEY ("player_id") REFERENCES "experiment_players"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "player_transactions" ADD CONSTRAINT "FK_cb5304de48a2ec818c2f48f843d" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_f73c578de3c64a4e2dd368c6e6e" FOREIGN KEY ("round_id") REFERENCES "rounds"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "rounds" ADD CONSTRAINT "FK_c98a2327bf856bfeb85ab3ec9d5" FOREIGN KEY ("session_id") REFERENCES "experiment_sessions"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "experiment_sessions" ADD CONSTRAINT "FK_0db690743537c6817a7ec71cd32" FOREIGN KEY ("experiment_id") REFERENCES "experiments"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "experiment_sessions" ADD CONSTRAINT "FK_9b68bdb51c6984d5c435051faea" FOREIGN KEY ("scenario_session_id") REFERENCES "scenario_sessions"("id")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "experiment_sessions" DROP CONSTRAINT "FK_9b68bdb51c6984d5c435051faea"`
    );
    await queryRunner.query(
      `ALTER TABLE "experiment_sessions" DROP CONSTRAINT "FK_0db690743537c6817a7ec71cd32"`
    );
    await queryRunner.query(
      `ALTER TABLE "rounds" DROP CONSTRAINT "FK_c98a2327bf856bfeb85ab3ec9d5"`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_f73c578de3c64a4e2dd368c6e6e"`
    );
    await queryRunner.query(
      `ALTER TABLE "player_transactions" DROP CONSTRAINT "FK_cb5304de48a2ec818c2f48f843d"`
    );
    await queryRunner.query(
      `ALTER TABLE "player_transactions" DROP CONSTRAINT "FK_058b8668561921969da077b0799"`
    );
    await queryRunner.query(`DROP TABLE "experiment_sessions"`);
    await queryRunner.query(`DROP TABLE "rounds"`);
    await queryRunner.query(`DROP TABLE "transactions"`);
    await queryRunner.query(`DROP TABLE "player_transactions"`);
  }
}
