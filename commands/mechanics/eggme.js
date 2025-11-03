import { SlashCommandBuilder } from 'discord.js';
import { generateEggMessage } from '../../src/utils/utils.js';

export const data = new SlashCommandBuilder().setName('eggme').setDescription('Receive a random egg');
export async function execute(interaction) {
    let userId = interaction.user.id;
    let message = generateEggMessage(userId);
    await interaction.reply(message);
}