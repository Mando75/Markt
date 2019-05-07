import { ResolverMap } from "../../types/graphql-utils";
import { Group } from "../../entity/Group";
import { Guide } from "../../entity/Guide";

export const resolvers: ResolverMap = {
  // Group: {
  //   guide: async (obj: Group) => {
  //     const g = (await Group.findOne(obj.id, {
  //       relations: ["guide"],
  //       cache: true
  //     })) as Group;
  //     return g.guide;
  //   }
  // },
  Query: {
    async group(_: any, { id }: GQL.IGroupOnQueryArguments, { loader }, info) {
      return await loader.loadOne(Group, { id }, info);
    }
  },
  Mutation: {
    async createGroup(
      _: any,
      { groupParams: { guideId, name } }: GQL.ICreateGroupOnMutationArguments
    ) {
      const guide = await Guide.findOne(guideId);
      const group = new Group();
      group.name = name;
      if (guide) {
        group.guide = guide;
      }
      return await group.save();
    }
  }
};
