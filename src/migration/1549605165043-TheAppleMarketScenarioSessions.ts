import { MigrationInterface, QueryRunner } from "typeorm";
import { Scenario } from "../entity/Scenario";

export class TheAppleMarketScenarioSessions1549605165043
  implements MigrationInterface {
  scenarioCode = "APPLMRKT";
  public async up(queryRunner: QueryRunner): Promise<any> {
    const s = await queryRunner.manager
      .getRepository(Scenario)
      .findOne({ scenarioCode: this.scenarioCode }, { select: ["id"] });

    if (s) {
      queryRunner.query(
        `INSERT INTO "scenario_sessions" ("id", "scenario_session_id", "session_number", "instructions", "round_discussion_points", "number_of_rounds", "scenario_id") VALUES (DEFAULT, $2, $3, $4, $5, $6, $1), (DEFAULT, $7, $8, $9, $10, $11, $1)`,
        this.genScenSessionParams(s.id)
      );
    } else throw new Error(`Scenario ${this.scenarioCode} does not exist`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from("scenario_sessions")
      .where("scenario_session_id IN (:...codes)", {
        codes: [`${this.scenarioCode}_SS_1`, `${this.scenarioCode}_SS_2`]
      })
      .execute();
  }

  genScenSessionParams(sId: string) {
    let params: any[] = [sId];
    // session 1
    // scenario session id
    params.push(`${this.scenarioCode}_SS_1`);
    // session number
    params.push(1);
    // instructions
    params.push(
      JSON.stringify([
        {
          step: 1,
          header: "Session 1, Round 1",
          bullets: [
            {
              format: ScenarioSchema.BulletFormat.ITALIC,
              text: "We are now ready for Round # of Session 1"
            },
            {
              format: ScenarioSchema.BulletFormat.ITALIC,
              text:
                "When you agree on a price, the seller records the price and the ID of the buyer in the transaction entry box. I will receive a record of all the transactions which we will review at the end of the round"
            },
            {
              format: ScenarioSchema.BulletFormat.BOLD,
              text: "Open the market."
            },
            {
              format: ScenarioSchema.BulletFormat.BOLD,
              text:
                "When trading has died down, declare the market closed, and select the 'End Round' button."
            },
            {
              format: ScenarioSchema.BulletFormat.BOLD,
              text:
                "When ready select 'View Round Summary' to navigate to the average price and transaction summary table"
            }
          ]
        },
        {
          step: 3,
          header: "Session 1, Round 2",
          bullets: [
            {
              format: ScenarioSchema.BulletFormat.ITALIC,
              text:
                "Remember this is Round 2 of Session 1. Everyone has the same role."
            },
            {
              format: ScenarioSchema.BulletFormat.ITALIC,
              text:
                "Like the last round, I'll open the market and you try to make a deal. When you have a deal, the seller records the ID of the buyer and the price in the transaction entry box. I will receive a record of all the transactions at the end of the round to review with you."
            },
            {
              format: ScenarioSchema.BulletFormat.BOLD,
              text: "Open the market"
            },
            {
              format: ScenarioSchema.BulletFormat.BOLD,
              text: "When trading has died down, declare the market closed."
            },
            {
              format: ScenarioSchema.BulletFormat.BOLD,
              text:
                "When ready select 'View Round Summary' to navigate to the average price and transaction summary table"
            }
          ]
        }
      ])
    );
    // discussion
    params.push(
      JSON.stringify([
        {
          step: 2,
          header: "Discussion",
          bullets: [
            {
              format: ScenarioSchema.BulletFormat.ITALIC,
              text:
                "How many buyers didn't buy a bushel? What was your buyer value?"
            },
            {
              format: ScenarioSchema.BulletFormat.ITALIC,
              text:
                "How many sellers didn't sell a bushel? What were your seller costs?"
            },
            {
              format: ScenarioSchema.BulletFormat.ITALIC,
              text:
                "Could any of the buyers who didn't buy make a transaction with any of the sellers who didn't sell?"
            },
            {
              format: ScenarioSchema.BulletFormat.ITALIC,
              text:
                "Where there any trades that were made that shouldn't have been made?"
            },
            {
              format: ScenarioSchema.BulletFormat.BOLD,
              text:
                "Look for any negative profits. Repeat again that no one has to trade, so there shouldn't be any negative profits."
            },
            {
              format: ScenarioSchema.BulletFormat.ITALIC,
              text:
                "Let's try another round. Remember a round is a repetition of the experimental setup. Everyone has the same role and the same values and costs. We are still in Session 1"
            }
          ]
        },
        {
          step: 4,
          header: "Discussion",
          bullets: [
            {
              format: ScenarioSchema.BulletFormat.ITALIC,
              text: "Were there any trades with negative profits?"
            },
            {
              format: ScenarioSchema.BulletFormat.ITALIC,
              text:
                "Let's move to Session 2, where each of you will have a different role."
            }
          ]
        }
      ])
    );
    // number of rounds
    params.push(2);
    // session 2
    // scenario session id
    params.push(`${this.scenarioCode}_SS_2`);
    // session number
    params.push(2);
    // instructions
    params.push(
      JSON.stringify([
        {
          step: 1,
          header: "Session 1, Round 1",
          bullets: [
            {
              format: ScenarioSchema.BulletFormat.ITALIC,
              text: "We are now in Session 2."
            },
            {
              format: ScenarioSchema.BulletFormat.ITALIC,
              text:
                "Look at your role assignment. You'll have different role instructions for Session 2"
            },
            {
              format: ScenarioSchema.BulletFormat.ITALIC,
              text:
                "We will have 2 rounds of Session 2. Your role will be the same in each round. This is the first round."
            },
            {
              format: ScenarioSchema.BulletFormat.ITALIC,
              text:
                "Now remember we area in Session 2. Check your role assignment instructions one more time. This is Round 1 of Session 2."
            },
            {
              format: ScenarioSchema.BulletFormat.BOLD,
              text: "Open the market."
            },
            {
              format: ScenarioSchema.BulletFormat.BOLD,
              text: "When trading has died down, close the market"
            },
            {
              format: ScenarioSchema.BulletFormat.BOLD,
              text:
                "Advance to the round summary screen to view the average price and transaction summary table."
            }
          ]
        },
        {
          step: 3,
          header: "Session 2, Round 2",
          bullets: [
            {
              format: ScenarioSchema.BulletFormat.ITALIC,
              text:
                "We are still in Session 2. This is the second round of Session 2."
            },
            {
              format: ScenarioSchema.BulletFormat.BOLD,
              text: "Open the market"
            },
            {
              format: ScenarioSchema.BulletFormat.BOLD,
              text: "When trading has died down, close the market"
            },
            {
              format: ScenarioSchema.BulletFormat.BOLD,
              text:
                "When ready, advance to the round summary screen to view the average price and transactions summary table."
            }
          ]
        }
      ])
    );
    // discussion
    params.push(
      JSON.stringify([
        {
          step: 2,
          header: "Round 1 Discussion",
          bullets: [
            {
              format: ScenarioSchema.BulletFormat.ITALIC,
              text: "Did any trades have negative profits?"
            },
            {
              format: ScenarioSchema.BulletFormat.ITALIC,
              text:
                "How does Session 2 differ from Session 1? ( Higher price and fewer transactions)"
            },
            {
              format: ScenarioSchema.BulletFormat.ITALIC,
              text: "Let's see if that holds up in the second round"
            }
          ]
        },
        {
          step: 4,
          header: "Round 2 Discussion",
          bullets: [
            {
              format: ScenarioSchema.BulletFormat.ITALIC,
              text:
                "OK. Now we have had two rounds of Session 2. How do the results differ from Session 1? (Higher prices, fewer transactions)"
            },
            {
              format: ScenarioSchema.BulletFormat.ITALIC,
              text:
                "Why do you think the average price was different between the two sessions?"
            },
            {
              format: ScenarioSchema.BulletFormat.ITALIC,
              text:
                "Before we answer that question, shouldn't we first ask what determines the average price in either session?"
            }
          ]
        }
      ])
    );
    // number of rounds
    params.push(2);
    return params;
  }
}
