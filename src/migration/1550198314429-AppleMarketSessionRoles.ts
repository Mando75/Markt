import { MigrationInterface, QueryRunner } from "typeorm";
import { ScenarioSession } from "../entity/ScenarioSession";
import { Scenario } from "../entity/Scenario";
import { RoleType } from "../entity/RoleType";

export class AppleMarketSessionRoles1550198314429
  implements MigrationInterface {
  scenarioCode = "APPLMRKT";
  public async up(queryRunner: QueryRunner): Promise<any> {
    const scenario = await queryRunner.manager
      .getRepository(Scenario)
      .findOne({ scenarioCode: this.scenarioCode });
    if (!scenario) {
      throw new Error(`Scenario ${this.scenarioCode} does not exist`);
    }
    const [sessions, types] = await Promise.all([
      scenario.scenarioSessions,
      scenario.roleTypes
    ]);

    let promises: Array<Promise<any>> = [];
    for (const t of types) {
      promises.push(this.insertType(queryRunner, t, sessions));
    }
    await Promise.all(promises);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const scenario = await queryRunner.manager
      .getRepository(Scenario)
      .findOne({ scenarioCode: this.scenarioCode });
    if (!scenario) {
      throw new Error(`Scenario ${this.scenarioCode} does not exist`);
    }

    const types = (await scenario.roleTypes).map((rt: RoleType) => rt.id);
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from("session_roles")
      .where("role_type_id IN (:...types)", { types })
      .execute();
  }

  private async insertType(
    qr: QueryRunner,
    type: RoleType,
    sessions: ScenarioSession[]
  ) {
    if (sessions.length !== 2) {
      throw new Error("Not enough sessions");
    }
    let promises: Array<Promise<any>> = [];
    promises.push(
      qr.query(
        `INSERT INTO session_roles (session_number, name, value, allow_sell, instructions, profit_equation, role_type_id, scenario_session_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8), ($9, $10, $11, $12, $13, $14, $15, $16)`,
        // @ts-ignore
        this.roleTypes[type.roleTypeId](type.id as string, [
          sessions[0].id as string,
          sessions[1].id as string
        ])
      )
    );
    await Promise.all(promises);
  }

  roleTypes = {
    APPLMRKT_RT_A: (rt: string, [session1, session2]: [string, string]) =>
      [
        Object.values({
          sessionNumber: 1,
          name: "Session 1",
          value: 40.0,
          allowSell: false,
          instructions: JSON.stringify([
            {
              bullets: [
                {
                  format: ScenarioSchema.BulletFormat.NORMAL,
                  text: `In this trading session you are an apple demander. Your buyer value is $40. If you buy a bushel of apples for price $P, your profit is $40−P. If you don’t buy any apples, your profit is $0.`
                }
              ]
            }
          ]),
          profitEquation: "$40 - P",
          roleType: rt,
          scenarioSession: session1
        }),
        Object.values({
          sessionNumber: 2,
          name: "Session 2",
          value: 30.0,
          allowSell: true,
          instructions: JSON.stringify([
            {
              bullets: [
                {
                  format: ScenarioSchema.BulletFormat.NORMAL,
                  text:
                    "In this trading session, you are an apple supplier. Your seller cost is $30. If you sell a bushel of apples for price $P, your profit is $P−30. If you don’t sell any apples, your profit is $0."
                },
                {
                  format: ScenarioSchema.BulletFormat.NORMAL,
                  text:
                    "If you sold apples, record the buyer ID and the price in the transaction box below. If you did not sell any apples, do not enter anything in the transaction box below."
                }
              ]
            }
          ]),
          profitEquation: "$P - 30",
          roleType: rt,
          scenarioSession: session2
        })
      ].flat(),
    APPLMRKT_RT_B: (rt: string, [session1, session2]: [string, string]) =>
      [
        Object.values({
          sessionNumber: 1,
          name: "Session 1",
          value: 20.0,
          allowSell: false,
          instructions: JSON.stringify([
            {
              bullets: [
                {
                  format: ScenarioSchema.BulletFormat.NORMAL,
                  text: `In this trading session you are an apple demander. Your buyer value is $20. If you buy a bushel of apples for price $P, your profit is $20−P. If you don’t buy any apples, your profit is $0.`
                }
              ]
            }
          ]),
          profitEquation: "$20 - P",
          roleType: rt,
          scenarioSession: session1
        }),
        Object.values({
          sessionNumber: 2,
          name: "Session 2",
          value: 10.0,
          allowSell: true,
          instructions: JSON.stringify([
            {
              bullets: [
                {
                  format: ScenarioSchema.BulletFormat.NORMAL,
                  text: `In this trading session, you are an apple supplier. Your seller cost is $10. If you sell a bushel of apples for price $P, your profit is $P−10. If you don’t sell any apples, your profit is $0.`
                },
                {
                  format: ScenarioSchema.BulletFormat.NORMAL,
                  text: `If you sold apples, record the buyer ID and the price in the transaction box below. If you did not sell any apples, do not enter anything in the transaction box below.`
                }
              ]
            }
          ]),
          profitEquation: "$P - 10",
          roleType: rt,
          scenarioSession: session2
        })
      ].flat(),
    APPLMRKT_RT_C: (rt: string, [session1, session2]: [string, string]) =>
      [
        Object.values({
          sessionNumber: 1,
          name: "Session 1",
          value: 20.0,
          allowSell: false,
          instructions: JSON.stringify([
            {
              bullets: [
                {
                  format: ScenarioSchema.BulletFormat.NORMAL,
                  text: `In this trading session you are an apple demander. Your buyer value is $20. If you buy a bushel of apples for price $P, your profit is $20−P. If you don’t buy any apples, your profit is $0.`
                }
              ]
            }
          ]),
          profitEquation: "$20 - P",
          roleType: rt,
          scenarioSession: session1
        }),
        Object.values({
          sessionNumber: 2,
          name: "Session 2",
          value: 40.0,
          allowSell: false,
          instructions: JSON.stringify([
            {
              bullets: [
                {
                  format: ScenarioSchema.BulletFormat.NORMAL,
                  text: `In this trading session you are an apple demander. Your buyer value is $40. If you buy a bushel of apples for price $P, your profit is $40−P. If you don’t buy any apples, your profit is $0.`
                }
              ]
            }
          ]),
          profitEquation: "$40 - P",
          roleType: rt,
          scenarioSession: session2
        })
      ].flat(),
    APPLMRKT_RT_D: (rt: string, [session1, session2]: [string, string]) =>
      [
        Object.values({
          sessionNumber: 1,
          name: "Session 1",
          value: 10.0,
          allowSell: true,
          instructions: JSON.stringify([
            {
              bullets: [
                {
                  format: ScenarioSchema.BulletFormat.NORMAL,
                  text: `In this trading session, you are an apple supplier. Your seller cost is $10. If you sell a bushel of apples for price $P, your profit is $P−10. If you don’t sell any apples, your profit is $0.`
                },
                {
                  format: ScenarioSchema.BulletFormat.NORMAL,
                  text: `If you sold apples, record the buyer ID and the price in the box below. If you did not sell any apples, mark an X across these fields.`
                }
              ]
            }
          ]),
          profitEquation: "$P - 10",
          roleType: rt,
          scenarioSession: session1
        }),
        Object.values({
          sessionNumber: 2,
          name: "Session 2",
          value: 20.0,
          allowSell: false,
          instructions: JSON.stringify([
            {
              bullets: [
                {
                  format: ScenarioSchema.BulletFormat.NORMAL,
                  text: `In this trading session you are an apple demander. Your buyer value is $20. If you buy a bushel of apples for price $P, your profit is $20−P. If you don’t buy any apples, your profit is $0.`
                }
              ]
            }
          ]),
          profitEquation: "$20 - P",
          roleType: rt,
          scenarioSession: session2
        })
      ].flat(),
    APPLMRKT_RT_E: (rt: string, [session1, session2]: [string, string]) =>
      [
        Object.values({
          sessionNumber: 1,
          name: "Session 1",
          value: 30.0,
          allowSell: true,
          instructions: JSON.stringify([
            {
              bullets: [
                {
                  format: ScenarioSchema.BulletFormat.NORMAL,
                  text: `In this trading session, you are an apple supplier. Your seller cost is $30. If you sell a bushel of apples for price $P, your profit is $P−30. If you don’t sell any apples, your profit is $0.`
                },
                {
                  format: ScenarioSchema.BulletFormat.NORMAL,
                  text: `If you sold apples, record the buyer ID and the price in the transaction box below. If you did not sell any apples, mark an X across these fields.`
                }
              ]
            }
          ]),
          profitEquation: "$P - 30",
          roleType: rt,
          scenarioSession: session1
        }),
        Object.values({
          sessionNumber: 2,
          name: "Session 2",
          value: 40.0,
          allowSell: false,
          instructions: JSON.stringify([
            {
              bullets: [
                {
                  format: ScenarioSchema.BulletFormat.NORMAL,
                  text: `In this trading session you are an apple demander. Your buyer value is $40. If you buy a bushel of apples for price $P, your profit is $40−P. If you don’t buy any apples, your profit is $0.`
                }
              ]
            }
          ]),
          profitEquation: "$40 - P",
          roleType: rt,
          scenarioSession: session2
        })
      ].flat(),
    APPLMRKT_RT_F: (rt: string, [session1, session2]: [string, string]) =>
      [
        Object.values({
          sessionNumber: 1,
          name: "Session 1",
          value: 30.0,
          allowSell: true,
          instructions: JSON.stringify([
            {
              bullets: [
                {
                  format: ScenarioSchema.BulletFormat.NORMAL,
                  text: `In this trading session, you are an apple supplier. Your seller cost is $10. If you sell a bushel of apples for price $P, your profit is $P−10. If you don’t sell any apples, your profit is $0.`
                },
                {
                  format: ScenarioSchema.BulletFormat.NORMAL,
                  text: `If you sold apples, record the buyer ID and the price in the transaction box below. If you did not sell any apples, do not enter anything in the transaction box below.`
                }
              ]
            }
          ]),
          profitEquation: "$P - 10",
          roleType: rt,
          scenarioSession: session1
        }),
        Object.values({
          sessionNumber: 2,
          name: "Session 2",
          value: 30.0,
          allowSell: true,
          instructions: JSON.stringify([
            {
              bullets: [
                {
                  format: ScenarioSchema.BulletFormat.NORMAL,
                  text: `In this trading session, you are an apple supplier. Your seller cost is $30. If you sell a bushel of apples for price $P, your profit is $P−30. If you don’t sell any apples, your profit is $0.`
                },
                {
                  format: ScenarioSchema.BulletFormat.NORMAL,
                  text: `If you sold apples, record the buyer ID and the price in the box below. If you did not sell any apples, mark an X across these fields.`
                }
              ]
            }
          ]),
          profitEquation: "$P - 30",
          roleType: rt,
          scenarioSession: session2
        })
      ].flat()
  };
}
