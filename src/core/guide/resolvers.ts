import { ResolverMap } from "../../types/graphql-utils";
import { createGuideFromUser, getGuide } from "./connectors";
import { Guide } from "../../entity/Guide";
import { Experiment } from "../../entity/Experiment";

export const resolvers: ResolverMap = {
  Guide: {
    async experiments(parent: Guide, { active, scenarioId }: any) {
      const activePresent = typeof active === "boolean";
      const idPresent = typeof scenarioId === "string";
      const where = {
        guide: parent,
        ...(activePresent && { active }),
        ...(idPresent && { scenarioId })
      };

      return await Experiment.find({
        where,
        cache: true
      });
    }
  },
  Query: {
    guide: getGuide
  },
  Mutation: {
    createGuideFromUser
  }
};
