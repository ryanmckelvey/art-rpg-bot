import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder().setName('new-test').setDescription('Test command to check bot functionality');
export async function execute(interaction) {
    await interaction.reply({ content: 'Test command received successfully! ✅', ephemeral: true });
}