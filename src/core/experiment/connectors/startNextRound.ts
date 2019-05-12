import { Experiment } from "../../../entity/Experiment";
import { ApolloError } from "apollo-server-express";
import { ExperimentErrorMessages } from "../experimentErrorMessages";
import { ExperimentStatusEnum } from "../../../enums/experimentStatus.enum";
import { ExperimentSession } from "../../../entity/ExperimentSession";
import { Round } from "../../../entity/Round";
import { GraphQLContext } from "../../../types/graphql-context";
import { SubscriptionKey } from "../../../enums/subscriptionKey.enum";

export const startNextRound = async (
  _: any,
  { experimentId }: GQL.IStartNextRoundOnMutationArguments,
  { user, pubsub }: GraphQLContext
) => {
  const experiment = await Experiment.findAndCheckExperiment(
    experimentId,
    user,
    {
      statuses: [
        ExperimentStatusEnum.SESSION_START,
        ExperimentStatusEnum.ROUND_SUMMARY
      ]
    }
  );
  const activeSession = await experiment.getActiveSession();
  if (!activeSession) {
    throw new ApolloError(ExperimentErrorMessages.NO_ACTIVE_SESSION, "403");
  }
  const rounds = await checkSessionRounds(activeSession);
  const newRoundNumber = rounds.length + 1;
  let newRound = Round.create({
    roundNumber: newRoundNumber
  });
  await deactivateRounds(rounds);
  newRound.session = activeSession;
  newRound = await newRound.save();
  await experiment.reload();
  pubsub.publish(SubscriptionKey.EXPERIMENT_STATUS_UPDATE, experiment);
  return newRound;
};

/**
 * Validation on session rounds
 * Checks length to ensure we don't overshoot
 * @param session
 */
const checkSessionRounds = async (session: ExperimentSession) => {
  if (session.rounds.length === session.scenarioSession.numberOfRounds) {
    throw new ApolloError(ExperimentErrorMessages.MAX_ROUNDS_REACHED, "403");
  }
  return session.rounds;
};

// TODO MOVE TO KUE
/**
 * Deactivates previous rounds which were still listed
 * as active
 * @param rounds
 */
const deactivateRounds = async (rounds: Round[]) => {
  await Promise.all(
    rounds
      .filter(r => r.active)
      .map(r => {
        r.active = false;
        return r.save();
      })
  );
};
