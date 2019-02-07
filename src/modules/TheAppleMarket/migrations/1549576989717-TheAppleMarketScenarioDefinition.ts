import { MigrationInterface, QueryRunner } from "typeorm";

export class TheAppleMarketScenarioDefinition1549576989717
  implements MigrationInterface {
  scenarioCode = "APPLMRKT";
  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("scenarios")
      .values([
        {
          scenarioCode: this.scenarioCode,
          maxPlayerSize: 48,
          sessionCount: 2,
          description:
            "The Apple Market is a basic experiment where students take turns buying and selling apples. It is meant for a class size of 48 students. Focuses on teaching about equilibrium price.",
          overviewJson: JSON.stringify([
            {
              sessionNumber: 1,
              roleDescription: [
                {
                  description: "Sellers with a $10 seller cost",
                  count: 16
                },
                {
                  description: "Sellers with a $30 seller cost",
                  count: 8
                },
                {
                  description: "Buyers with a $40 buyer value",
                  count: 8
                },
                {
                  description: "Buyers with a $20 buyer value",
                  count: 16
                }
              ],
              chartPoints: [
                [[0, 40], [8, 20], [24, 0]],
                [[0, 10], [16, 30], [24, 40]]
              ],
              expectations:
                "Equilibrium price is $20, but notice that 8 $20 buyers are indifferent. Should expect those buyers to negotiate a price below $20."
            },
            {
              sessionNumber: 2,
              roleDescription: [
                {
                  description: "Sellers with $10 seller cost",
                  count: 8
                },
                {
                  description: "Sellers with $30 seller cost",
                  count: 16
                },
                {
                  description: "Buyers with $40 buyer value",
                  count: 16
                },
                {
                  description: "Buyers with $20 buyer value",
                  count: 8
                }
              ],
              chartPoints: [
                [[0, 40], [16, 20], [24, 0]],
                [[0, 10], [8, 30], [24, 40]]
              ],
              expectations:
                "Equilibrium price is $30, but 8 high cost sellers indifferent at that price. Should expect them to negotiate a price higher than $30."
            }
          ]),
          instructions: JSON.stringify([
            {
              step: 1,
              header: "Introduce yourself and the procedures in the section",
              bullets: [
                {
                  format: ScenarioSchema.BulletFormat.BOLD,
                  text:
                    "Write your name on the board, your email address, and office hours"
                }
              ]
            },
            {
              step: 2,
              header: "Introduce the experiment",
              bullets: [
                {
                  format: ScenarioSchema.BulletFormat.ITALIC,
                  text:
                    "Major concepts in this course are first introduced through experiments in sections."
                },
                {
                  format: ScenarioSchema.BulletFormat.ITALIC,
                  text:
                    "Today, we will do the first experiment, the Farmer's Apple Market."
                },
                {
                  format: ScenarioSchema.BulletFormat.ITALIC,
                  text:
                    "When you joined the experiment, you were assigned a role. This role will determine your goals in the following experiment."
                },
                {
                  format: ScenarioSchema.BulletFormat.ITALIC,
                  text:
                    "Please look for you ID code on the screen. It will remain visible throughout the experiment, and you will need it in order to record your transactions."
                },
                {
                  format: ScenarioSchema.BulletFormat.ITALIC,
                  text:
                    "Each experiment will begin this way with me inviting you to join an experiment. You must be here by the time I have closed the experiment to joining. If you arrive after experiment joining has been closed, you will not be able to participate."
                },
                {
                  format: ScenarioSchema.BulletFormat.BOLD,
                  text:
                    "At this point you may close experiment joining. Tell students who are late that they can stay and watch, but they can't participate."
                },
                {
                  format: ScenarioSchema.BulletFormat.ITALIC,
                  text:
                    "Notice the role you have been assigned for this experiment. Some of you have apples you want to sell. Others want to buy. In a minute, I will open the market, and buyers can make deals with sellers."
                },
                {
                  format: ScenarioSchema.BulletFormat.ITALIC,
                  text:
                    "If you are a buyer, you will notice that we have assigned you a buyer value. This is the most you are willing to pay for a bushel of apples. your profit from buying a bushel is this buyer value minus the price you pay."
                },
                {
                  format: ScenarioSchema.BulletFormat.ITALIC,
                  text:
                    "If you are a seller, we have assigned you a seller cost. This is the least you are wiling to accept for a bushel of apples. Your profit from selling a bushel is the price you receive minus this cost."
                },
                {
                  format: ScenarioSchema.BulletFormat.ITALIC,
                  text:
                    "Your goal is to make as much profit as y ou can. I will post the profit that each of you made on the section web site, and I will award prizes next time for the traders with the highest profit. Think of this experiment as a game. Compete and have fun. If you do, you will be acting like individuals in the real world, who are trying tod the best they can for themselves. Our experiment will mimic real life, and we can study the results of this experiment as a good test of how markets work in the real world."
                },
                {
                  format: ScenarioSchema.BulletFormat.ITALIC,
                  text:
                    "We'll run two experiments today, with two repetitions of each. In a repetition, the experiment controls are the same. In our case, in a repetition, everyone has exactly the same buyer values and seller costs. We want to see if the results are basically the same. Was the first run of the experiment a fluke? Does the repetition produce the same result?"
                },
                {
                  format: ScenarioSchema.BulletFormat.ITALIC,
                  text:
                    "We have a name for repetitions of our experiment with the same buyer values and seller costs. We call them <strong><em>rounds</em></strong>of the same <strong><em>session</em></strong>. When the buyer values and seller costs change, we call that a different session. Today we will have two rounds of Session 1 and two rounds of Session 2. Look at your role assignment. Note that your role changes as we move from Session 1 to Session 2."
                },
                {
                  format: ScenarioSchema.BulletFormat.ITALIC,
                  text: "Two important points:"
                },
                {
                  format: ScenarioSchema.BulletFormat.BOLD,
                  text:
                    "You do not have to trade. So, you should never have a negative profit. If the best deal you can get gives you a negative profit, don't trade. "
                },
                {
                  format: ScenarioSchema.BulletFormat.BOLD,
                  text:
                    "You can buy one bushel at most. You can sell on bushel at most."
                }
              ]
            }
          ]),
          roleDistribution: this.createRoleDist()
        }
      ]);
  }

  createRoleDist() {
    let roleDist: Array<string> = [];
    const typeCodes = [
      `${this.scenarioCode}-RT-A`,
      `${this.scenarioCode}-RT-B`,
      `${this.scenarioCode}-RT-C`,
      `${this.scenarioCode}-RT-D`,
      `${this.scenarioCode}-RT-E`,
      `${this.scenarioCode}-RT-F`
    ];
    for (let i = 0; i < 48; i++) {
      typeCodes.forEach(code => {
        roleDist.push(code);
      });
    }
    return roleDist;
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
