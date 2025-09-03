require("dotenv").config();
const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "hey",
    description: "Replies with hey",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Register slash command");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.CLIENT_ID
      ),
      { body: commands }
    );
    console.log("Slash command complete");
  } catch (error) {
    console.log(`Error:${error}`);
  }
})();
