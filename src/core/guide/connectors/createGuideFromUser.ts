import { GraphQLContext } from "../../../types/graphql-context";
import { User } from "../../../entity/User";
import { Guide } from "../../../entity/Guide";

export const createGuideFromUser = async (
  _: any,
  { userId }: GQL.ICreateGuideFromUserOnMutationArguments,
  __: GraphQLContext
) => {
  const user = await User.findOne(userId);
  if (user) {
    const guide = new Guide();
    guide.user = user;
    return await guide.save();
  }
};
