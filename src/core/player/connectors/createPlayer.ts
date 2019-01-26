import { GraphQLContext } from "../../../types/graphql-context";
import { Guide } from "../../../entity/Guide";
import { Group } from "../../../entity/Group";
import { Player } from "../../../entity/Player";
import { UserInputError, ApolloError } from "apollo-server-express";

export const createPlayer = async (
  _: any,
  {
    playerParams: { guideId, groupId, email, firstName, lastName }
  }: GQL.ICreatePlayerOnMutationArguments,
  __: GraphQLContext
) => {
  try {
    const guideP = Guide.findOne({
      where: { id: guideId },
      select: ["id"]
    });
    const groupP = Group.findOne({
      where: { id: groupId },
      select: ["id"]
    });
    const player = Player.create({
      firstName,
      lastName,
      email
    });
    const [guide, group] = await Promise.all([guideP, groupP]);
    player.group = group;
    if (guide) {
      player.guide = guide;
      return await player.save();
    } else {
      throw new ApolloError(
        "Invalid guide: Guide does not exist",
        "BAD_USER_INPUT",
        {
          invalidArgs: "guideId"
        }
      );
    }
  } catch (e) {
    if (e.extensions && e.extensions.code === "BAD_USER_INPUT") {
      throw e;
    }
    throw new UserInputError("Invalid parameter");
  }
};
