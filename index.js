const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const bot_token = process.env.TOKEN;
const prefix = '>';

// https://discord.com/api/oauth2/authorize?client_id=1011579868405833809&permissions=8&scope=bot%20applications.commands

const aphro = new Client( {intents: [GatewayIntentBits.Guilds] });

aphro.once('ready', () => {
    console.log('Aphrodite is up and running!');
});

aphro.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath,file);
    const command = require(filePath);
    aphro.commands.set(command.data.name, command);
}

aphro.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    
    const command = aphro.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch(error) {
        console.log(error);
        await interaction.reply({ content: 'Error while executing command.', ephemeral: true});
    }
});


aphro.login(bot_token);
