import { Experiment } from "../../../entity/Experiment";
import { ApolloError } from "apollo-server-express";
import { ExperimentErrorMessages } from "../experimentErrorMessages";
import { ExperimentStatusEnum } from "../../../enums/experimentStatus.enum";
import { ExperimentPlayer } from "../../../entity/ExperimentPlayer";
import { Round } from "../../../entity/Round";
import { Transaction } from "../../../entity/Transaction";
import { PlayerTransaction } from "../../../entity/PlayerTransaction";

export const makeTransaction = async (
  _: any,
  {
    params: { experimentId, buyerCode, sellerCode, amount }
  }: GQL.IMakeTransactionOnMutationArguments
) => {
  const { experiment, round } = await findAndCheckExperimentInfo(experimentId);
  const { buyer, seller } = await findAndCheckPlayers(
    buyerCode,
    sellerCode,
    experiment
  );
  let transaction = await createTransaction(round, amount, buyer, seller);
  transaction = await createPlayerTransactions(buyer, seller, transaction);
  await transaction.save();
  await Promise.all([transaction.updatePlayers(), transaction._updateRound()]);
  return transaction;
};

/**
 * Find's and checks a valid experiment id was given
 * @param id
 */
const findAndCheckExperimentInfo = async (id: string) => {
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
  const round = await experiment.getActiveRound();
  if (!round) {
    throw new ApolloError(ExperimentErrorMessages.STATUS_NOT_READY, "403");
  }
  return { experiment, round };
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
  const [ePlayers, count] = await ExperimentPlayer.createQueryBuilder("ep")
    .leftJoinAndSelect("ep.player", "p")
    .where("ep.experiment_id = :exId", { exId: experiment.id })
    .andWhere("p.player_code IN (:...playerCodes)", {
      playerCodes: [buyerCode, sellerCode]
    })
    .getManyAndCount();
  if (count !== 2) {
    throw new ApolloError(ExperimentErrorMessages.PLAYER_DOES_NOT_EXIST, "404");
  }
  const players = await Promise.all(ePlayers.map(p => p.player));
  const buyerIndex = players.findIndex(p => p.playerCode === buyerCode);
  const sellerIndex = players.findIndex(p => p.playerCode === sellerCode);
  const buyer = ePlayers[buyerIndex];
  const seller = ePlayers[sellerIndex];
  if (!buyer) {
    throw new ApolloError(ExperimentErrorMessages.BUYER_DOES_NOT_EXIST, "404");
  } else if (!seller) {
    throw new ApolloError(ExperimentErrorMessages.SELLER_DOES_NOT_EXIST, "404");
  }
  const sRoleType = await seller.getCurrentSessionRole();
  if (!sRoleType.allowSell) {
    throw new ApolloError(
      ExperimentErrorMessages.PLAYER_NOT_ALLOWED_TO_SELL,
      "403"
    );
  }
  return { buyer, seller };
};

/**
 * Creates a new transaction record. DOES NOT SAVE IT
 * @param currentRound
 * @param amount
 * @param buyer
 * @param seller
 */
const createTransaction = async (
  currentRound: Round,
  amount: number,
  buyer: ExperimentPlayer,
  seller: ExperimentPlayer
) => {
  const [buyerProfit, sellerProfit] = await Promise.all([
    buyer.getProfit(amount),
    seller.getProfit(amount)
  ]);
  const t = Transaction.create({
    amount,
    buyerProfit,
    sellerProfit
  });
  t.round = Promise.resolve(currentRound);
  return t;
};

/**
 * Creates the playerTransaction join table record
 * @param buyer
 * @param seller
 * @param transaction
 */
const createPlayerTransactions = async (
  buyer: ExperimentPlayer,
  seller: ExperimentPlayer,
  transaction: Transaction
) => {
  const sellerPt = PlayerTransaction.create({
    isSeller: true
  });
  sellerPt.player = Promise.resolve(seller);
  const buyerPt = PlayerTransaction.create({
    isSeller: false
  });
  buyerPt.player = Promise.resolve(buyer);
  transaction.playerTransactions = Promise.resolve([buyerPt, sellerPt]);
  return transaction;
};
