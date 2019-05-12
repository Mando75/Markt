import { Experiment } from "../../../entity/Experiment";
import { ApolloError } from "apollo-server-express";
import { ExperimentErrorMessages } from "../experimentErrorMessages";
import { ExperimentStatusEnum } from "../../../enums/experimentStatus.enum";
import { ExperimentSession } from "../../../entity/ExperimentSession";
import { GraphQLContext } from "../../../types/graphql-context";
import { SubscriptionKey } from "../../../enums/subscriptionKey.enum";
import { ScenarioSession } from "../../../entity/ScenarioSession";

/**
 * Starts a new session in a given experiment. Validates that a new session
 * can be created before doing so. Returns the new experiment session.
 * TODO: Add subscription update
 * @param _
 * @param experimentId
 * @param user
 * @param pubsub
 */
export const startNextSession = async (
  _: any,
  { experimentId }: GQL.IStartNextSessionOnMutationArguments,
  { user, pubsub }: GraphQLContext
) => {
  const experiment = await Experiment.findAndCheckExperiment(
    experimentId,
    user,
    {
      statuses: [
        ExperimentStatusEnum.JOINING,
        ExperimentStatusEnum.ROUND_SUMMARY
      ],
      relations: ["sessions", "scenario"]
    }
  );
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
 * Retrieves the experiment sessions and checks that a new one can be created
 * @param experiment
 */
const checkExperimentSessions = async (experiment: Experiment) => {
  const sessions = experiment.sessions;
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
  session.experiment = experiment;
  session.scenarioSession = scenarioSession;
  return await session.save();
};
