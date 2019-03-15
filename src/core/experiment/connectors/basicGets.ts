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
      { excludedFields: ["__typename", "group", "guide", "closed", "players"] }
    )
  ) as (keyof Experiment)[];
  return fields.length
    ? await Experiment.findOne(id, {
        select: fields.filter(f => f !== "scenario"),
        relations: fields.includes("scenario") ? ["scenario"] : []
      })
    : await Experiment.findOne(id);
};

export const getExperimentPlayers = async (exp: Experiment) => {
  return await ExperimentPlayer.createQueryBuilder("ep")
    .leftJoinAndSelect("ep.player", "epPlayer")
    .where("ep.experiment_id = :experimentId", { experimentId: exp.id })
    .getMany();
};
