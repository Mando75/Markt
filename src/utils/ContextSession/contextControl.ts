import { Redis } from "ioredis";
import { User } from "../../entity/User";
import { Player } from "../../entity/Player";
import { PubSub } from "apollo-server-express";
import { Experiment } from "../../entity/Experiment";
import { ExperimentPlayer } from "../../entity/ExperimentPlayer";
import { ExperimentSession } from "../../entity/ExperimentSession";
import { Group } from "../../entity/Group";
import { Guide } from "../../entity/Guide";
import { Institution } from "../../entity/Institution";
import { PlayerTransaction } from "../../entity/PlayerTransaction";
import { RoleType } from "../../entity/RoleType";
import { Scenario } from "../../entity/Scenario";
import { ScenarioSession } from "../../entity/ScenarioSession";
import { SessionRole } from "../../entity/SessionRole";
import { Transaction } from "../../entity/Transaction";

export const pubsub = new PubSub();
/**
 * Return a closure to generate the graphql context
 * @param redis
 */
export const setContext = (redis: Redis) => {
  return async ({ req }: any) => {
    let user: User | undefined = undefined;
    let player: Player | undefined = undefined;
    if (req.session.userId) {
      user = await User.findOne(
        { id: req.session.userId, active: true },
        { cache: true }
      );
    }
    if (req.session.playerId) {
      player = await Player.findOne(
        { id: req.session.playerId, active: true },
        { cache: true }
      );
    }
    return {
      redis,
      pubsub,
      url: `${req.protocol}://${req.get("host")}`,
      session: req.session,
      user,
      player,
      req: req,
      loaders: createLoaders()
    };
  };
};

const createLoaders = () => ({
  experimentLoader: Experiment.getDataloader(),
  experimentPlayerLoader: ExperimentPlayer.getDataloader(),
  experimentSessionLoader: ExperimentSession.getDataloader(),
  groupLoader: Group.getDataloader(),
  guideLoader: Guide.getDataloader(),
  institutionLoader: Institution.getDataloader(),
  playerLoader: Player.getDataloader(),
  playerTransactionLoader: PlayerTransaction.getDataloader(),
  roleTypeLoader: RoleType.getDataloader(),
  roundLoader: RoleType.getDataloader(),
  scenarioLoader: Scenario.getDataloader(),
  scenarioSessionLoader: ScenarioSession.getDataloader(),
  sessionRoleLoader: SessionRole.getDataloader(),
  transactionLoader: Transaction.getDataloader(),
  userLoader: User.getDataloader()
});
