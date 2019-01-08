import { generateNamespace } from "@gql2ts/from-schema";
import * as fs from "fs";
import * as path from "path";

import { makeSchema } from "../src/utils/makeSchema";

const types = generateNamespace("GQL", makeSchema());

fs.writeFileSync(path.join(__dirname, "../src/types/graphql.d.ts"), types);
process.exit(0);
