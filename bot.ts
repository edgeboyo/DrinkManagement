import * as dotenv from "dotenv";
import { Client, Intents } from "discord.js";

dotenv.config();

//Check if a discord token is provided
if (process.env.DISCORD_TOKEN === undefined) {
  console.log("No DISCORD_TOKEN provided in .env file");
  process.exit(1);
}

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
