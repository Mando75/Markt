import {MigrationInterface, QueryRunner} from "typeorm";

export class roleType1549090799786 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "role_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role_type_id" character varying(50) NOT NULL, "name" character varying(255) NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "scenario_id" uuid NOT NULL, CONSTRAINT "UQ_3f493515964092d1c2a6e94ef28" UNIQUE ("role_type_id"), CONSTRAINT "PK_31e81d4897da311d67372a5c077" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "role_types" ADD CONSTRAINT "FK_b99b84e267b8d72ea4058516cfa" FOREIGN KEY ("scenario_id") REFERENCES "scenarios"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "role_types" DROP CONSTRAINT "FK_b99b84e267b8d72ea4058516cfa"`);
        await queryRunner.query(`DROP TABLE "role_types"`);
    }

}
