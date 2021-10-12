import * as dotenv from "dotenv";
import { Client, Intents } from "discord.js";
import { build_commands } from "./commands";

dotenv.config();

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

login_and_run(client);

async function login_and_run(client: Client) {
  const token = process.env.DISCORD_TOKEN;
  const clientId = process.env.CLIENT_ID;

  //Check if a discord token is provided
  if (token === undefined) {
    console.log("No DISCORD_TOKEN provided in .env file");
    process.exit(1);
  }

  if (clientId === undefined) {
    console.log("No CLIENT_ID provided in .env file");
    process.exit(4);
  }

  // Login to Discord with your client's token
  await client.login(token);

  build_commands(clientId, token);

  /*
  if (client.application === null) {
    console.log("Client app null");
    process.exit(2);
  }

  await client.application.commands
    .create({
      name: "test",
      description: "A test command",
    })
    .then(console.log)
    .catch(console.error);

  console.log(client.application.commands);
  */
}
