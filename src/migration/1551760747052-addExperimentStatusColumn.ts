import {MigrationInterface, QueryRunner} from "typeorm";

export class addExperimentStatusColumn1551760747052 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "experiments_status_enum" AS ENUM('joining', 'session_start', 'in_round', 'round_summary', 'closed')`);
        await queryRunner.query(`ALTER TABLE "experiments" ADD "status" "experiments_status_enum" NOT NULL DEFAULT 'joining'`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_f73c578de3c64a4e2dd368c6e6e"`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "round_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_f73c578de3c64a4e2dd368c6e6e" FOREIGN KEY ("round_id") REFERENCES "rounds"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_f73c578de3c64a4e2dd368c6e6e"`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "round_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_f73c578de3c64a4e2dd368c6e6e" FOREIGN KEY ("round_id") REFERENCES "rounds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "experiments" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "experiments_status_enum"`);
    }

}
