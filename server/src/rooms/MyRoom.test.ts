import { describe, beforeAll, afterAll, beforeEach, expect, it } from "vitest";
import { ColyseusTestServer, boot } from "@colyseus/testing";

// import your "app.config.ts" file here.
import appConfig from "../app.config";

describe("testing your Colyseus app", () => {
  let colyseus: ColyseusTestServer;

  beforeAll(async () => (colyseus = await boot(appConfig)));
  afterAll(async () => await colyseus.shutdown());

  beforeEach(async () => await colyseus.cleanup());

  it("connecting into a room", async () => {
    // `room` is the server-side Room instance reference.
    const room = await colyseus.createRoom("my_room", {});

    // `client1` is the client-side `Room` instance reference (same as JavaScript SDK)
    const client1 = await colyseus.connectTo(room);

    const client2 = await colyseus.connectTo(room);

    // make your assertions
    expect(client1.sessionId).toEqual(room.clients[0].sessionId);
    expect(client2.sessionId).toEqual(room.clients[1].sessionId);
  });
});