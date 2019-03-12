import { GraphQLContext } from "../../../types/graphql-context";
import { GraphQLResolveInfo } from "graphql";
import { Guide } from "../../../entity/Guide";
import { Scenario } from "../../../entity/Scenario";
import { Group } from "../../../entity/Group";
import { ApolloError } from "apollo-server-express";
import { Experiment } from "../../../entity/Experiment";
import { Redis } from "ioredis";
import { RedisPrefix } from "../../../enums/redisPrefix.enum";

export const startNewExperiment = async (
  _: any,
  { params }: GQL.IStartNewExperimentOnMutationArguments,
  { redis, session }: GraphQLContext,
  __: GraphQLResolveInfo
) => {
  let scenario: Scenario, guide: Guide, group: Group;
  try {
    const promises: Array<Promise<any>> = [
      Scenario.findOne(params.scenarioId),
      Guide.findOne(params.guideId, { select: ["id"] })
    ];
    if (params.groupId) {
      promises.push(Group.findOne(params.groupId, { select: ["id"] }));
    }
    [scenario, guide, group] = await Promise.all(promises);
  } catch (err) {
    console.log(err.code, err.message);
    return new ApolloError("Object not found", "404");
  }
  checkPaths(scenario, guide, group);
  const experiment = new Experiment();
  experiment.scenario = scenario;
  experiment.guide = Promise.resolve(guide);
  experiment.group = Promise.resolve(group);
  await experiment.save();
  await loadRoleDist(experiment, redis);
  session.experimentId = experiment.id;
  return experiment;
};

/**
 * Checks that the scenario, guide, and group are all present and accounted for
 * @param scenario
 * @param guide
 * @param group
 */
const checkPaths = (scenario: Scenario, guide: Guide, group: Group) => {
  if (!scenario) {
    throw new ApolloError(
      "Invalid Scenario: A valid scenario ID must be provided",
      "404"
    );
  }
  if (!guide) {
    throw new ApolloError(
      "Invalid Guide: A valid guide ID must be provided",
      "404"
    );
  }
  if (!group) {
    throw new ApolloError(
      "Invalid Group: A valid group ID must be provided",
      "404"
    );
  }
};

/**
 * Load the scenario role distribution into redis as an array
 * to be popped as players join. If an error occurs, a new apollo
 * error is returned, and the experiment deleted.
 * @param experiment
 * @param redis
 */
export const loadRoleDist = async (experiment: Experiment, redis: Redis) => {
  const multi = redis.multi();
  experiment.scenario.roleDistribution.forEach(role =>
    multi.rpush(RedisPrefix.ROLE_DIST + experiment.id, role)
  );
  try {
    await multi.exec();
    await redis.expire(RedisPrefix.ROLE_DIST + experiment.id, 60 * 60 * 24);
  } catch (e) {
    console.log(e);
    // Delete the experiment record, roles are not loaded correctly
    await experiment.remove();
    throw new ApolloError("Could not load role distribution", "500");
  }
};
