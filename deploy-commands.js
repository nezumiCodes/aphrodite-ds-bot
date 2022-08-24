const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const clientId = process.env.APPLICATION_ID;
const guildId = process.env.CLIENT_ID;
const bot_token = process.env.TOKEN;

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

/*
const rest = new REST({ version: '10' }).setToken(bot_token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => {console.log('Succesfully registered applications commands.')})
    .catch(console.error);
*/