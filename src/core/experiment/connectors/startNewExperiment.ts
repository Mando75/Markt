import { GraphQLContext } from "../../../types/graphql-context";
import { GraphQLResolveInfo } from "graphql";
import { Guide } from "../../../entity/Guide";
import { Scenario } from "../../../entity/Scenario";
import { Group } from "../../../entity/Group";
import { ApolloError } from "apollo-server-express";
import { Experiment } from "../../../entity/Experiment";

export const startNewExperiment = async (
  _: any,
  { params }: GQL.IStartNewExperimentOnMutationArguments,
  ___: GraphQLContext,
  __: GraphQLResolveInfo
) => {
  const promises: Array<Promise<any>> = [
    Scenario.findOne(params.scenarioId, { select: ["id"] }),
    Guide.findOne(params.guideId, { select: ["id"] }),
    Group.findOne(params.groupId, { select: ["id"] })
  ];
  const [scenario, guide, group] = await Promise.all(promises);
  checkPaths(scenario, guide, group);
  const experiment = new Experiment();
  experiment.scenario = scenario;
  experiment.guide = Promise.resolve(guide);
  experiment.group = Promise.resolve(group);
  return await experiment.save();
};

const checkPaths = (scenario: Scenario, guide: Guide, group: Group) => {
  if (!scenario)
    throw new ApolloError(
      "Invalid Scenario: A valid scenario ID must be provided",
      "404"
    );
  if (!guide)
    throw new ApolloError(
      "Invalid Guide: A valid guide ID must be provided",
      "404"
    );
  if (!group)
    throw new ApolloError(
      "Invalid Group: A valid group ID must be provided",
      "404"
    );
};
