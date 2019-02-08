import { MigrationInterface, QueryRunner } from "typeorm";
import { Scenario } from "../entity/Scenario";

export class TheAppleMarketRoleTypeDefinitions1549599553870
  implements MigrationInterface {
  scenarioCode = "APPLMRKT";
  typeLetters = ["A", "B", "C", "D", "E", "F"];
  public async up(queryRunner: QueryRunner): Promise<any> {
    const s = await queryRunner.manager
      .getRepository(Scenario)
      .findOne({ scenarioCode: this.scenarioCode });
    if (s) {
      await queryRunner.query(
        `INSERT INTO "role_types" ("id", "role_type_id", "name", "created_date", "updated_date", "scenario_id") VALUES (DEFAULT, $1, $2, DEFAULT, DEFAULT, $13), (DEFAULT , $3, $4, DEFAULT, DEFAULT, $13), (DEFAULT, $5, $6, DEFAULT, DEFAULT, $13),(DEFAULT, $7, $8, DEFAULT, DEFAULT, $13),(DEFAULT, $9, $10, DEFAULT, DEFAULT, $13),(DEFAULT , $11, $12, DEFAULT, DEFAULT, $13)`,
        this.genRoleTypeParams(s.id)
      );
    } else {
      throw new Error(`Scenario ${this.scenarioCode} does not exist`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from("role_types")
      .where("role_type_id IN (:...codes)", {
        codes: this.genRoleTypeIds()
      })
      .execute();
  }

  genRoleTypeParams(sId: string) {
    let params: string[] = [];
    this.typeLetters.forEach(letter => {
      params.push(`${this.scenarioCode}_RT_${letter}`);
      params.push(`Type ${letter}`);
    });
    params.push(sId);
    return params;
  }

  genRoleTypeIds() {
    return this.typeLetters.map(letter => `${this.scenarioCode}_RT_${letter}`);
  }
}
