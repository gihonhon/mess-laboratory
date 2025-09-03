import { Client, GatewayIntentBits } from "discord.js";
import fetch from "node-fetch";
import { serve } from "bun";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

async function getMeme() {
  const response = await fetch("https://meme-api.com/gimme");
  const json = await response.json();
  return { title: json.title, url: json.url };
}

// Handle meme command
client.on("messageCreate", async (message) => {
  if (message.content.toLowerCase() === "?meme") {
    const meme = await getMeme();
    message.channel.send({ content: `**${meme.title}**`, files: [meme.url] });
  }
});

// Login bot
client.login(process.env.TOKEN);

// Keep Bun.js server alive
serve({
  port: 3000,
  fetch(req) {
    return new Response("Bot is running!", { status: 200 });
  },
});
