import { GraphQLContext } from "../../../types/graphql-context";
import { GraphQLResolveInfo } from "graphql";
import * as graphqlFields from "graphql-fields";
import { Experiment } from "../../../entity/Experiment";

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
        select: fields,
        relations: fields.includes("scenario") ? ["scenario"] : []
      })
    : await Experiment.findOne(id);
};
