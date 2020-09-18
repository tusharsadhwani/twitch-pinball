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

const dropData = { id: -1 };

client.on("message", (channel, tags, message, self) => {
  if (self) return;

  if (message.toLowerCase() === "!drop") {
    client.say(channel, `dropping @${tags.username}`);
    dropData.id++;
  }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/drops", (req, res) => {
  res.json(dropData);
});

app.listen(9879, () => console.log("Listening on port 9879"));
