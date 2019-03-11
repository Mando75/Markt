import { Experiment } from "../../../entity/Experiment";
import { ApolloError } from "apollo-server-express";
import { ExperimentErrorMessages } from "../experimentErrorMessages";
import { ExperimentStatusEnum } from "../../../enums/experimentStatus.enum";
import { ExperimentPlayer } from "../../../entity/ExperimentPlayer";

export const makeTransaction = async (
  _: any,
  {
    params: { experimentId, buyerCode, sellerCode }
  }: GQL.IMakeTransactionOnMutationArguments
) => {
  const experiment = await findAndCheckExperiment(experimentId);
  const { buyer, seller } = await findAndCheckPlayers(
    buyerCode,
    sellerCode,
    experiment
  );
};

/**
 * Find's and checks a valid experiment id was given
 * @param id
 */
const findAndCheckExperiment = async (id: string) => {
  const experiment = await Experiment.findOne({
    where: { id, active: true }
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

/**
 * Finds the experiment players needed to record a transaction
 * @param buyerCode
 * @param sellerCode
 * @param experiment
 */
const findAndCheckPlayers = async (
  buyerCode: string,
  sellerCode: string,
  experiment: Experiment
) => {
  const [players, count] = await ExperimentPlayer.createQueryBuilder("ep")
    .leftJoinAndSelect("ep.player", "p")
    .where("ep.experiment_id = :exId", { exId: experiment.id })
    .andWhere("p.player_code IN (:...playerCodes)", {
      playerCodes: [buyerCode, sellerCode]
    })
    .getManyAndCount();
  if (count !== 2) {
    throw new ApolloError(ExperimentErrorMessages.PLAYER_DOES_NOT_EXIST, "404");
  }
  const buyer = players.find(p => p.player.playerCode === buyerCode);
  const seller = players.find(p => p.player.playerCode === sellerCode);
  if (!buyer) {
    throw new ApolloError(ExperimentErrorMessages.BUYER_DOES_NOT_EXIST, "404");
  } else if (!seller) {
    throw new ApolloError(ExperimentErrorMessages.SELLER_DOES_NOT_EXIST, "404");
  }
  return { buyer, seller };
};
