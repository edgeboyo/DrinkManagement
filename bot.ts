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

login_and_run(client);

async function login_and_run(client: Client) {
  // Login to Discord with your client's token
  await client.login(process.env.DISCORD_TOKEN);

  if (client.application === null) {
    console.log("Client app null");
    process.exit(2);
  }

  client.application.commands
    .create({
      name: "test",
      description: "A test command",
    })
    .then(console.log)
    .catch(console.error);
}
