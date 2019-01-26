import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateGroupAndPlayerTables1548472401439 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "players" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "player_code" character varying(6) NOT NULL, "email" character varying(255) NOT NULL, "first_name" character varying(255), "last_name" character varying(255), "active" boolean NOT NULL DEFAULT true, "accepted_tos" boolean NOT NULL DEFAULT false, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "guide_id" uuid NOT NULL, "group_id" uuid, CONSTRAINT "PK_de22b8fdeee0c33ab55ae71da3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "active" boolean NOT NULL DEFAULT true, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "guide_id" uuid NOT NULL, CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "FK_d14692e738d6f44d064c44d87a0" FOREIGN KEY ("guide_id") REFERENCES "guides"("id")`);
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "FK_6ef6494ecfce4b57b10d487b181" FOREIGN KEY ("group_id") REFERENCES "groups"("id")`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_6dcd3411b1ed963e5fa9392c6bf" FOREIGN KEY ("guide_id") REFERENCES "guides"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_6dcd3411b1ed963e5fa9392c6bf"`);
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_6ef6494ecfce4b57b10d487b181"`);
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_d14692e738d6f44d064c44d87a0"`);
        await queryRunner.query(`DROP TABLE "groups"`);
        await queryRunner.query(`DROP TABLE "players"`);
    }

}
