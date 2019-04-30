import { GraphQLContext } from "../../../types/graphql-context";
import { GraphQLResolveInfo } from "graphql";
import * as graphqlFields from "graphql-fields";
import { Experiment } from "../../../entity/Experiment";
import { ExperimentPlayer } from "../../../entity/ExperimentPlayer";

export const getExperiment = async (
  _: any,
  { id }: GQL.IExperimentOnQueryArguments,
  __: GraphQLContext,
  info: GraphQLResolveInfo
) => {
  /**
   * Grab only the top level fields being called.
   * Exclude any relation columns, as they do not exist on the table
   */
  const fields = Object.keys(
    graphqlFields(
      info,
      {},
      {
        excludedFields: ["__typename", "closed", "activeRound", "activeSession"]
      }
    )
  ) as (keyof Experiment)[];
  return fields.length
    ? await Experiment.findOne(id, {
        relations: Experiment.filterRelationsFromQueryFields(fields),
        cache: true
      })
    : await Experiment.findOne(id, { cache: true });
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
