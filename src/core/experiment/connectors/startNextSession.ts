import { Experiment } from "../../../entity/Experiment";
import { ApolloError } from "apollo-server-express";
import { ExperimentErrorMessages } from "../experimentErrorMessages";
import { ExperimentStatusEnum } from "../../../enums/experimentStatus.enum";
import { ExperimentSession } from "../../../entity/ExperimentSession";
import { GraphQLContext } from "../../../types/graphql-context";
import { User } from "../../../entity/User";
import { SubscriptionKey } from "../../../enums/subscriptionKey.enum";
import { ScenarioSession } from "../../../entity/ScenarioSession";

/**
 * Starts a new session in a given experiment. Validates that a new session
 * can be created before doing so. Returns the new experiment session.
 * TODO: Add subscription update
 * @param _
 * @param experimentId
 */
export const startNextSession = async (
  _: any,
  { experimentId }: GQL.IStartNextSessionOnMutationArguments,
  { user, pubsub }: GraphQLContext
) => {
  const experiment = await findAndCheckExperiment(experimentId, user);
  const [sessions, scenarioSessions] = await Promise.all([
    checkExperimentSessions(experiment),
    checkScenarioSessions(experiment)
  ]);
  const newSessionNumber = sessions.length + 1;
  const scenarioSession = scenarioSessions.find(
    ss => ss.sessionNumber === newSessionNumber,
    { cache: true }
  );
  if (!scenarioSession) {
    throw new ApolloError(ExperimentErrorMessages.MALFORMED_SCENARIO, "500");
  }
  let newSession = ExperimentSession.create({
    sessionNumber: newSessionNumber
  });
  await deactivateSessions(sessions);
  const [savedSession] = await Promise.all([
    saveNewSession(newSession, experiment, scenarioSession)
  ]);
  await experiment.reload();
  pubsub.publish(SubscriptionKey.EXPERIMENT_STATUS_UPDATE, experiment);
  return savedSession;
};

/**
 * Searches the database for an experiment by id.
 * performs validation that a new session can be created
 * by checking experiment status
 * @param id
 * @param user
 */
const findAndCheckExperiment = async (id: string, user: User | undefined) => {
  const guide = user ? await user.guide : null;
  const experiment = await Experiment.findOne({
    where: { id, active: true, guide },
    cache: true
  });
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
    throw new ApolloError(ExperimentErrorMessages.STATUS_NOT_READY, "403");
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
  if (!scenarioSessions || !scenarioSessions.length) {
    throw new ApolloError(ExperimentErrorMessages.MALFORMED_SCENARIO, "500");
  }
  return scenarioSessions;
};

/**
 * Deactivates a list of sessions
 * @param sessions
 */
const deactivateSessions = async (sessions: ExperimentSession[]) => {
  await Promise.all(
    sessions
      .filter(s => s.active)
      .map(s => {
        s.active = false;
        return s.save();
      })
  );
};

const saveNewSession = async (
  session: ExperimentSession,
  experiment: Experiment,
  scenarioSession: ScenarioSession
) => {
  session.experiment = Promise.resolve(experiment);
  session.scenarioSession = Promise.resolve(scenarioSession);
  return await session.save();
};
