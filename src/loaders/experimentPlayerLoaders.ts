import { ExperimentPlayer } from "../entity/ExperimentPlayer";
import * as DataLoader from "dataloader";
import { oneToOneMapper } from "./index";
import { Transaction } from "../entity/Transaction";
import apply = Reflect.apply;

export const experimentPlayerLoaders = () => ({
  ep: ExperimentPlayer.getDataloader(),
  // EXPERIMENT
  epExperiment: new DataLoader(async (ids: string[]) => {
    const eps = await ExperimentPlayer.findByIds(ids, {
      select: ["id", "experiment"],
      relations: ["experiment"],
      cache: true
    });
    return Promise.all(oneToOneMapper(eps, ids).map(ep => ep.experiment));
  }),
  epPlayer: new DataLoader(async (ids: string[]) => {
    const eps = await ExperimentPlayer.findByIds(ids, {
      select: ["id", "player"],
      relations: ["player"],
      cache: true
    });
    return Promise.all(oneToOneMapper(eps, ids).map(ep => ep.player));
  }),
  epRoleType: new DataLoader(async (ids: string[]) => {
    console.log("loading experiment player role types");
    const eps = await ExperimentPlayer.findByIds(ids, {
      select: ["id", "roleType"],
      relations: ["roleType"],
      cache: true
    });
    console.log("resolving experiment player role types");
    return Promise.all(oneToOneMapper(eps, ids).map(ep => ep.roleType));
  }),
  epTransactions: new DataLoader(async (ids: string[]) => {
    ids = ids.concat([
      "d205496c-5233-491a-bfe7-07343cde2573",
      "47400926-1bf2-4f7f-9260-623759c1cc42",
      "298adc52-aeeb-41e2-af6b-6ab897abd8bf",
      "72d98ff3-166e-4b11-a206-c86e92b468b0",
      "37e3c829-38ae-4f2c-b50e-f38dd58dba2b",
      "aa841834-a485-45e6-b20c-a59da6b59024"
    ]);
    const transactions = await Transaction.createQueryBuilder("t")
      .leftJoinAndSelect("t.playerTransactions", "pt")
      .leftJoinAndSelect("pt.player", "ep")
      .where("ep.id IN (:...ids)", { ids })
      .getMany();
    // this is ok because the relation has already been loaded by the select. It won't execute another db query
    const playerTransactions = await Promise.all(
      transactions.map(t => t.playerTransactions)
    );
    // const eplayers = await Promise.all(playerTransactions.map(pt => pt.))
    console.log(playerTransactions);
    return transactions;
  })
});
