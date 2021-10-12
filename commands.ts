import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Client, GuildMemberRoleManager } from "discord.js";

export async function build_commands(clientId: string, token: string) {
  const commands = [
    new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Replies with pong!"),
    new SlashCommandBuilder()
      .setName("server")
      .setDescription("Replies with server info!"),
    new SlashCommandBuilder()
      .setName("user")
      .setDescription("Replies with user info!"),
    new SlashCommandBuilder()
      .setName("checkperms")
      .setDescription("Check my perms"),
  ].map((command) => command.toJSON());

  const rest = new REST({ version: "9" }).setToken(token);

  await rest
    .put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
}

export function handle_commands(client: Client) {
  console.log("Setting up command handling");
  client.on("interactionCreate", async (interaction) => {
    console.log("Interact");
    if (!interaction.isCommand()) return;

    interaction.member?.permissions;

    const { commandName } = interaction;

    if (commandName === "ping") {
      await interaction.reply("Pong!");
    } else if (commandName === "server") {
      await interaction.reply("Server info.");
    } else if (commandName === "user") {
      await interaction.reply("User info.");
    } else if (commandName == "checkperms") {
      if (
        interaction.member === null ||
        interaction.member?.roles === undefined
      ) {
        await interaction.reply("Error!");
        return;
      }

      console.log(interaction.memberPermissions?.toJSON());

      if (
        !interaction.memberPermissions?.has("MANAGE_GUILD") ||
        !interaction.memberPermissions?.has("ADMINISTRATOR")
      ) {
        await interaction.reply("Yes, you can!");
      } else {
        await interaction.reply("No fuuuucking way!");
      }
    }
  });
  console.log("Command handling set up");
}
