import { ResolverMap } from "../../types/graphql-utils";
import { Scenario } from "../../entity/Scenario";
import { GraphQLContext } from "../../types/graphql-context";

export const resolvers: ResolverMap = {
  Query: {
    async scenario(
      _: any,
      { id }: GQL.IScenarioOnQueryArguments,
      __: GraphQLContext
    ) {
      return await Scenario.findOne(id);
    }
  }
};
