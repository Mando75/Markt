import {MigrationInterface, QueryRunner} from "typeorm";

export class addMirroredPlayerFields1556078678722 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "experiment_players" ADD "player_code" character varying(6) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "experiment_players" ADD "first_name" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "experiment_players" ADD "last_name" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "experiment_players" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "experiment_players" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "experiment_players" DROP COLUMN "player_code"`);
    }

}
