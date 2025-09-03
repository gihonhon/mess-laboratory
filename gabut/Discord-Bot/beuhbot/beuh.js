import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
} from "discord.js";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

// Create a new bot client
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Define the commands
const commands = [
  new SlashCommandBuilder().setName("meme").setDescription("Get a random meme"),
].map((command) => command.toJSON());

// Register commands
const rest = new REST({ version: "10" }).setToken();

async function registerCommands() {
  try {
    console.log("📢 Registering commands...");
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });
    console.log("✅ Commands registered!");
  } catch (error) {
    console.error("Error registering commands:", error);
  }
}

// Fetch a random meme
async function getMeme() {
  const response = await fetch("https://meme-api.com/gimme");
  const json = await response.json();
  return { title: json.title, url: json.url };
}

// Event when bot is ready
client.once("ready", () => {
  console.log(`✅ Bot is running as ${client.user.tag}`);
});

// Handle slash commands
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "meme") {
    // Defer reply to avoid expiration
    await interaction.deferReply();

    try {
      const meme = await getMeme();
      await interaction.editReply({
        content: `**${meme.title}**`,
        files: [meme.url],
      });
    } catch (error) {
      await interaction.editReply("⚠️ Failed to fetch meme. Try again later!");
      console.error("Error fetching meme:", error);
    }
  }
});

// Start the bot
client.login(process.env.TOKEN);
registerCommands();
