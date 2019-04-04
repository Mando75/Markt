import { GraphQLContext } from "../../../types/graphql-context";
import { User } from "../../../entity/User";
import { Experiment } from "../../../entity/Experiment";
import { ApolloError } from "apollo-server-express";
import { ExperimentErrorMessages } from "../experimentErrorMessages";
import { ExperimentStatusEnum } from "../../../enums/experimentStatus.enum";
import { SubscriptionKey } from "../../../enums/subscriptionKey.enum";

export const endCurrentRound = async (
  _: any,
  { experimentId }: GQL.IEndCurrentRoundOnMutationArguments,
  { user, pubsub }: GraphQLContext
) => {
  const experiment = await findAndCheckExperiment(experimentId, user);
  const round = await experiment.getActiveRound();
  if (!round) {
    throw new ApolloError(ExperimentErrorMessages.NO_ACTIVE_ROUND, "404");
  }
  round.active = false;
  experiment.status = ExperimentStatusEnum.ROUND_SUMMARY;
  await Promise.all([round.save(), experiment.save()]);
  pubsub.publish(SubscriptionKey.EXPERIMENT_STATUS_UPDATE, experiment);
  return round;
};

const findAndCheckExperiment = async (
  experimentId: string,
  user: User | undefined
) => {
  const guide = user ? await user.guide : null;
  const experiment = await Experiment.findOne({
    where: { id: experimentId, active: true, guide },
    cache: true
  });
  if (!experiment) {
    throw new ApolloError(
      ExperimentErrorMessages.EXPERIMENT_DOES_NOT_EXIST,
      "404"
    );
  } else if (experiment.status !== ExperimentStatusEnum.IN_ROUND) {
    throw new ApolloError(ExperimentErrorMessages.STATUS_NOT_READY, "403");
  }
  return experiment;
};
