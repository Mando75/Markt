import { PlayerTransaction } from "../entity/PlayerTransaction";
import { ExperimentSession } from "../entity/ExperimentSession";
import { Group } from "../entity/Group";
import { Guide } from "../entity/Guide";
import { Institution } from "../entity/Institution";
import { Player } from "../entity/Player";
import { RoleType } from "../entity/RoleType";
import { Round } from "../entity/Round";
import { Scenario } from "../entity/Scenario";
import { ScenarioSession } from "../entity/ScenarioSession";
import { SessionRole } from "../entity/SessionRole";
import { Transaction } from "../entity/Transaction";
import { User } from "../entity/User";
import { experimentLoaders } from "./experimentLoaders";
import { BaseEntity } from "../entity/BaseEntity";
import groupBy from "lodash.groupby";
import { experimentPlayerLoaders } from "./experimentPlayerLoaders";

export const createLoaders = () => ({
  experimentSessionLoader: ExperimentSession.getDataloader(),
  groupLoader: Group.getDataloader(),
  guideLoader: Guide.getDataloader(),
  institutionLoader: Institution.getDataloader(),
  playerLoader: Player.getDataloader(),
  playerTransactionLoader: PlayerTransaction.getDataloader(),
  roleTypeLoader: RoleType.getDataloader(),
  roundLoader: Round.getDataloader(),
  scenarioLoader: Scenario.getDataloader(),
  scenarioSessionLoader: ScenarioSession.getDataloader(),
  sessionRoleLoader: SessionRole.getDataloader(),
  transactionLoader: Transaction.getDataloader(),
  userLoader: User.getDataloader(),
  ...experimentLoaders(),
  ...experimentPlayerLoaders()
});

export function oneToOneMapper<T extends BaseEntity>(
  records: Array<T>,
  ids: string[]
): Array<T> {
  const recordMap: { [key: string]: T } = {};
  records.forEach(record => (recordMap[record.id] = record));
  return ids.map(id => recordMap[id]);
}

export function oneToManyMapper<T extends BaseEntity>(
  records: Array<T>,
  ids: string[]
): Array<Array<T>> {
  const recordMap = groupBy(records, "id");
  return ids.map(id => recordMap[id]);
}
