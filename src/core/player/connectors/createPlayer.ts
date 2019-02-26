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
    // Fetch fields
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

    // Try to set the fields
    // Player must have a guide, so throw error if it does not exist
    if (guide) {
      player.guide = Promise.resolve(guide);
      // TODO Fix bug that player isn't reloading
      await player.save();
      // Manually reload because of bug
      const p2 = await Player.findOne({
        where: { playerCode: player.playerCode, guide, active: true }
      });
      if (!p2) {
        await player.remove();
        throw new ApolloError("Error finding player");
      }

      await sendWelcomeEmail(p2, guide);
      return p2;
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

const sendWelcomeEmail = async (p2: Player, guide: Guide) => {
  try {
    await sendGridPlayerWelcomeEmail(
      p2.email,
      p2.firstName || p2.lastName || p2.email,
      guide.user.fullName || guide.user.email,
      p2.playerCode
    );
  } catch (e) {
    console.log(e);
    throw new ApolloError("Could not send welcome email");
  }
};
