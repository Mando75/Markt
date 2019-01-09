import { bootstrapConnections } from "../bootstrapConnections";

describe("startServer", () => {
  it("starts the server", async () => {
    const resp = await bootstrapConnections(0);
    expect(resp).toBeTruthy();
  });
});
