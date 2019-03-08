import { Experiment } from "../../../entity/Experiment";
import { ApolloError } from "apollo-server-express";
import { ExperimentErrorMessages } from "../experimentErrorMessages";
import { ExperimentStatusEnum } from "../../../enums/experimentStatus.enum";

export const startNextRound = async (
  _: any,
  { experimentId }: GQL.IStartNextRoundOnMutationArguments
) => {
  const experiment = await findAndCheckExperiment(experimentId);
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
