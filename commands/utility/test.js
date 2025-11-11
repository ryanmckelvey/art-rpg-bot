import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder().setName('test').setDescription('Test command to check bot functionality').setDefaultMemberPermissions(0);
export async function execute(interaction) {
    await interaction.reply({ content: 'Test command received successfully! ✅', flags: 'Ephemeral' });
}