import { ResolverMap } from "../../types/graphql-utils";
import { Scenario } from "../../entity/Scenario";

export const resolvers: ResolverMap = {
  Query: {
    async scenario(id: string) {
      return await Scenario.findOne(id);
    }
  }
};
