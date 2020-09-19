import { Client } from "tmi.js";
import express from "express";
import cors from "cors";

require("dotenv").config();
const client = Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: "drunktimebot",
    password: process.env.OAUTH_TOKEN,
  },
  channels: ["drunktimelord"],
});

client.connect();

let lastDrop = { id: 0 };
let lastQueryId = 0;
const dropQueue: { id: number }[] = [];

client.on("message", (channel, tags, message, self) => {
  if (self) return;

  if (message.toLowerCase().startsWith("!drop")) {
    const dropId = ++lastQueryId;
    dropQueue.push({ id: dropId });
    client.say(
      channel,
      `dropping @${tags.username} - #${dropId.toString().padStart(4, "0")}`
    );
  }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/drops", (req, res) => {
  const lastDropId = Number(req.query.last);

  if (dropQueue.length > 0) {
    if (dropQueue[0].id != lastDropId) {
      lastDrop.id = dropQueue[0].id;
      dropQueue.shift();
    }
  }
  res.json(lastDrop);
});

app.listen(9879, () => console.log("Listening on port 9879"));
