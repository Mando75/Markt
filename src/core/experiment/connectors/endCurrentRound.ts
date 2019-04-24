import { GraphQLContext } from "../../../types/graphql-context";
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
  const experiment = await Experiment.findAndCheckExperiment(
    experimentId,
    user,
    [ExperimentStatusEnum.IN_ROUND]
  );
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
