const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const bot_token = process.env.TOKEN;
const prefix = '>';

// https://discord.com/api/oauth2/authorize?client_id=1011579868405833809&permissions=8&scope=bot%20applications.commands

const aphro = new Client( {intents: [GatewayIntentBits.Guilds] });

aphro.once('ready', () => {
    console.log('Aphrodite is up and running!');
});

aphro.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return; 

    const { commandName } = interaction; 

    if (commandName === 'ping') {
        await interaction.reply('Pong');
    } else if (commandName === 'server') {
        await interaction.reply(`Server name: ${interaction.guild.name} \nTotal members: ${interaction.guild.memberCount}`);
    } else {
        await interaction.reply(`Your tag: ${interaction.user.tag} \nYour id: ${interaction.user.id}`);
    }
});

aphro.login(bot_token);
