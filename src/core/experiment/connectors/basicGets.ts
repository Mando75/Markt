import { Experiment } from "../../../entity/Experiment";
import { ExperimentPlayer } from "../../../entity/ExperimentPlayer";

export const getExperiment = async (
  _: any,
  { id }: GQL.IExperimentOnQueryArguments
) => {
  return await Experiment.findOne(id);
};

export const getExperimentPlayers = async (exp: Experiment) => {
  return await ExperimentPlayer.find({
    relations: ["playerTransactions", "playerTransactions.transaction"],
    where: { experiment: exp }
  });
};
