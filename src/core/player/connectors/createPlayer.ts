import { GraphQLContext } from "../../../types/graphql-context";
import { Guide } from "../../../entity/Guide";
import { Group } from "../../../entity/Group";
import { Player } from "../../../entity/Player";
import { UserInputError, ApolloError } from "apollo-server-express";
import { sendGridPlayerWelcomeEmail } from "../../../utils/email/sendEmail";

export const createPlayer = async (
  _: any,
  {
    playerParams: { guideId, groupId, email, firstName, lastName }
  }: GQL.ICreatePlayerOnMutationArguments,
  __: GraphQLContext
) => {
  try {
    const guideP = Guide.findOne({
      where: { id: guideId }
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
    player.group = group ? Promise.resolve(group) : group;
    if (guide) {
      player.guide = Promise.resolve(guide);
      await player.save();
      await sendGridPlayerWelcomeEmail(
        player.email,
        player.firstName || player.lastName || player.email,
        guide.user.fullName || guide.user.email,
        player.playerCode
      );
      return player;
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
