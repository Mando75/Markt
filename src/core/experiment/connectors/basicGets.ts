import { GraphQLContext } from "../../../types/graphql-context";
import { GraphQLResolveInfo } from "graphql";
import * as graphqlFields from "graphql-fields";
import { Experiment } from "../../../entity/Experiment";
import { ExperimentPlayer } from "../../../entity/ExperimentPlayer";
import { Resolver } from "../../../types/graphql-utils";

export const getExperiment: Resolver = async (
  _: any,
  { id }: GQL.IExperimentOnQueryArguments,
  { loader },
  info
) => {
  return loader.loadOne(Experiment, { id }, info);
};

export const getExperimentPlayer = async (
  _: any,
  { id }: GQL.IExperimentPlayerOnQueryArguments,
  { player }: GraphQLContext,
  info: GraphQLResolveInfo
) => {
  const fields = Object.keys(
    graphqlFields(
      info,
      {},
      { excludedFields: ["__typename", "currentSessionRole", "profitEquation"] }
    )
  ) as (keyof ExperimentPlayer)[];
  return fields.length
    ? await ExperimentPlayer.findOne({
        where: { id, player, active: true },
        relations: ExperimentPlayer.filterRelationsFromQueryFields(fields),
        cache: true
      })
    : await ExperimentPlayer.findOne(id, { cache: true });
};
