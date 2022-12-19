// Require the necessary discord.js classes
import { Client, Events, Collection, GatewayIntentBits } from "discord.js";
import { config as envConfig } from "dotenv";
import { deployCommands } from "./deploy-commands.js";

envConfig();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { commands } = await deployCommands(process.env.TOKEN);
client.commands = commands;

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
  console.log(interaction);
	//const command = interaction.client.commands.get(interaction.commandName);
  const command = client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);
