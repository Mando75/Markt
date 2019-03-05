import { Experiment } from "../../../entity/Experiment";
import { ApolloError } from "apollo-server-express";
import { ExperimentErrorMessages } from "../experimentErrorMessages";
import { ExperimentStatusEnum } from "../../../enums/experimentStatus.enum";
import { ExperimentSession } from "../../../entity/ExperimentSession";

export const startNextSession = async (_: any, { experimentId }: any) => {
  const experiment = await findAndCheckExperiment(experimentId);
  const [sessions, scenarioSessions] = await Promise.all([
    checkExperimentSessions(experiment),
    checkScenarioSessions(experiment)
  ]);
  const newSessionNumber = sessions.length + 1;
  const scenarioSession = scenarioSessions.find(
    ss => ss.sessionNumber === newSessionNumber
  );
  if (!scenarioSession) {
    throw new ApolloError(ExperimentErrorMessages.MALFORMED_SCENARIO, "500");
  }
  const newSession = ExperimentSession.create({
    sessionNumber: newSessionNumber
  });
  newSession.experiment = Promise.resolve(experiment);
  newSession.scenarioSession = Promise.resolve(scenarioSession);
  return await newSession.save();
};

/**
 * Searches the database for an experiment by id.
 * performs validation that a new session can be created
 * by checking experiment status
 * @param id
 */
const findAndCheckExperiment = async (id: string) => {
  const experiment = await Experiment.findOne({ where: { id, active: true } });
  // Check if a valid experiment id
  if (!experiment) {
    throw new ApolloError(
      ExperimentErrorMessages.EXPERIMENT_DOES_NOT_EXIST,
      "404"
    );
    // check that the experiment is ready to start a session
  } else if (
    ![
      ExperimentStatusEnum.JOINING,
      ExperimentStatusEnum.ROUND_SUMMARY
    ].includes(experiment.status)
  ) {
    throw new ApolloError(
      ExperimentErrorMessages.EXPERIMENT_IN_ROUND_OR_CLOSED,
      "403"
    );
  }
  return experiment;
};

/**
 * Retrieves the experiment sessions and checks that a new one can be created
 * @param experiment
 */
const checkExperimentSessions = async (experiment: Experiment) => {
  const sessions = await experiment.sessions;
  if (sessions.length === experiment.scenario.sessionCount) {
    throw new ApolloError(ExperimentErrorMessages.MAX_SESSIONS_REACHED, "403");
  }
  return sessions;
};

/**
 * Fetches the scenario sessions off the experiment record. Provides basic
 * validation of existence and error checking
 * @param experiment
 */
const checkScenarioSessions = async (experiment: Experiment) => {
  const scenarioSessions = await experiment.scenario.scenarioSessions;
  if (!scenarioSessions) {
    throw new ApolloError(ExperimentErrorMessages.MALFORMED_SCENARIO, "500");
  }
  return scenarioSessions;
};
