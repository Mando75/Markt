import { Experiment } from "../../../entity/Experiment";
import { ApolloError } from "apollo-server-express";
import { ExperimentErrorMessages } from "../experimentErrorMessages";
import { ExperimentStatusEnum } from "../../../enums/experimentStatus.enum";
import { ExperimentSession } from "../../../entity/ExperimentSession";
import { Round } from "../../../entity/Round";
import { GraphQLContext } from "../../../types/graphql-context";
import { User } from "../../../entity/User";
import { SubscriptionKey } from "../../../enums/subscriptionKey.enum";

export const startNextRound = async (
  _: any,
  { experimentId }: GQL.IStartNextRoundOnMutationArguments,
  { user, pubsub }: GraphQLContext
) => {
  const experiment = await findAndCheckExperiment(experimentId, user);
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
  newRound.session = Promise.resolve(activeSession);
  newRound = await newRound.save();
  console.log("updating experiment");
  await experiment.reload();
  console.log(experiment.status);
  console.log(await experiment.getActiveSession());
  pubsub.publish(SubscriptionKey.EXPERIMENT_STATUS_UPDATE, experiment);
  return newRound;
};

/**
 * Finds the experiment, scoping the possible results to those owned
 * by the guide.
 * @param id
 * @param user
 */
const findAndCheckExperiment = async (id: string, user: User | undefined) => {
  const guide = user ? await user.guide : null;
  const experiment = await Experiment.findOne({
    where: { id, active: true, guide }
  });
  if (!experiment) {
    throw new ApolloError(
      ExperimentErrorMessages.EXPERIMENT_DOES_NOT_EXIST,
      "404"
    );
  } else if (
    ![
      ExperimentStatusEnum.SESSION_START,
      ExperimentStatusEnum.ROUND_SUMMARY
    ].includes(experiment.status)
  ) {
    throw new ApolloError(ExperimentErrorMessages.STATUS_NOT_READY, "403");
  }
  return experiment;
};

/**
 * Validation on session rounds
 * Checks length to ensure we don't overshoot
 * @param session
 */
const checkSessionRounds = async (session: ExperimentSession) => {
  const [rounds, scenarioSession] = await Promise.all([
    session.rounds,
    session.scenarioSession
  ]);
  if (rounds.length === scenarioSession.numberOfRounds) {
    throw new ApolloError(ExperimentErrorMessages.MAX_ROUNDS_REACHED, "403");
  }
  return rounds;
};

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
