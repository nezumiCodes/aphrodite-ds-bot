const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Replies with user info.'),
	async execute(interaction) {
		await interaction.reply(`User name: ${interaction.user.tag} \nUser ID: ${interaction.user.id}`);
	},
};