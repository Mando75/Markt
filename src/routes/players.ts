import { Router } from "express";
import * as multer from "multer";
import { createReadStream } from "fs";
import { parse, NODE_STREAM_INPUT } from "papaparse";
import { createQueue } from "kue";

const router: Router = Router();
const upload = multer({ dest: "/tmp/playerInvites" });
const kue = createQueue();

router.post("/players/invite", upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(404).json({ msg: "must attach file" });
    return;
  }

  const output: Array<any> = [];
  const rs = createReadStream(req.file.path);
  rs.pipe(
    parse(NODE_STREAM_INPUT, {
      encoding: "utf-8",
      header: true,
      beforeFirstChunk(chunk: string): string | void {
        const rows = chunk.split(/\r\n|\r|\n/);
        const headings = rows[0]
          .split(",")
          .map(heading => heading.replace(/(-|\s)/gm, "_").toLowerCase());

        for (const e of ["first_name", "last_name", "email"]) {
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
    .on("data", data => {
      const
    })
    .on("end", () => {
      res.json(output);
    });
});

export default router;
