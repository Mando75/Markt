import { bootstrapConnections, normalizePort } from "./utils";

bootstrapConnections(normalizePort(process.env.PORT || "4000"));
