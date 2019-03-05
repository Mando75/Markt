import { GraphQLContext } from "../../../types/graphql-context";
import { Experiment } from "../../../entity/Experiment";
import { ApolloError } from "apollo-server-express";
import { ExperimentErrorMessages } from "../experimentErrorMessages";

export const startNextSession = async (
  _: any,
  { experimentId }: any,
  context: GraphQLContext
) => {
  const experiment = await Experiment.findOne(experimentId);
};

const findAndCheckExperiment = async (id: string) => {
  const experiment = await Experiment.findOne(id);
  if (!experiment) {
    throw new ApolloError(
      ExperimentErrorMessages.EXPERIMENT_DOES_NOT_EXIST,
      "404"
    );
  }
  return experiment;
};
