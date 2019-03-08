import { Experiment } from "../../../entity/Experiment";
import { ApolloError } from "apollo-server-express";
import { ExperimentErrorMessages } from "../experimentErrorMessages";
import { ExperimentStatusEnum } from "../../../enums/experimentStatus.enum";
import { ExperimentSession } from "../../../entity/ExperimentSession";
import { Round } from "../../../entity/Round";

export const startNextRound = async (
  _: any,
  { experimentId }: GQL.IStartNextRoundOnMutationArguments
) => {
  const experiment = await findAndCheckExperiment(experimentId);
  const activeSession = await experiment.getActiveSession();
  if (!activeSession) {
    throw new ApolloError(ExperimentErrorMessages.NO_ACTIVE_SESSION, "403");
  }
  const rounds = await checkSessionRounds(activeSession);
  const newRoundNumber = rounds.length + 1;
  const newRound = Round.create({
    roundNumber: newRoundNumber
  });
  await deactivateRounds(rounds);
  newRound.session = Promise.resolve(activeSession);
  return await newRound.save();
};

const findAndCheckExperiment = async (id: string) => {
  const experiment = await Experiment.findOne({ where: { id, active: true } });
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
