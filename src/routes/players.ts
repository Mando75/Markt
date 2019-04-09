import { Router } from "express";
import * as multer from "multer";
import { createReadStream } from "fs";
import { parse, NODE_STREAM_INPUT } from "papaparse";
import { Player } from "../entity/Player";
import { Guide } from "../entity/Guide";
import { generate } from "randomstring";

const router: Router = Router();
const upload = multer({ dest: "/tmp/playerInvites" });

router.post("/players/invite", upload.single("file"), (req, res) => {
  const { guideId, groupId } = req.body;
  if (!guideId) {
    return res.status(404).json({ msg: "must provide guide id" });
  }
  if (!req.file) {
    res.status(404).json({ msg: "must attach file" });
    return;
  }

  const players: Array<{
    firstname: string;
    lastname: string;
    email: string;
  }> = [];
  const rs = createReadStream(req.file.path);

  rs.pipe(
    parse(NODE_STREAM_INPUT, {
      encoding: "utf-8",
      header: true,
      beforeFirstChunk(chunk: string): string | void {
        const rows = chunk.split(/\r\n|\r|\n/);
        const headings = rows[0]
          .split(",")
          .map(heading => heading.replace(/(_|-|\s)/gm, "").toLowerCase());

        for (const e of ["firstname", "lastname", "email"]) {
          if (!headings.includes(e)) {
            rs.close();
            res.status(422).json({ msg: `missing '${e}' column` });
            return;
          }
        }

        rows[0] = headings.join();
        return rows.join("\n");
      }
    })
  )
    .on("data", player => {
      players.push(player);
    })
    .on("end", async () => {
      const guide = await Guide.findOne(guideId);
      const playerCodes = (await Player.find({
        where: { guide, active: true },
        select: ["playerCode"]
      })).map(p => p.playerCode);
      const { generatedMaps: savedPlayers } = await Player.createQueryBuilder()
        .insert()
        .into(Player)
        .values(
          players.map(p => ({
            firstName: p.firstname,
            lastName: p.lastname,
            email: p.email,
            guide: guideId,
            group: groupId,
            playerCode: getPlayerCode(playerCodes)
          }))
        )
        .returning(["firstName", "lastName", "playerCode", "email"])
        .execute();
      res.json({ savedPlayers, guideId });
    });
});

export default router;

const getPlayerCode = (playerCodes: string[]) => {
  let goodOption = false;
  let option = "";
  while (!goodOption) {
    option = generate({
      length: 6,
      charset: "alphanumeric",
      readable: true,
      capitalization: "uppercase"
    });
    goodOption = !playerCodes.includes(option);
  }
  return option;
};
