import { SlashCommandBuilder } from 'discord.js';
import { generateEggMessage } from '../../src/utils/mechanics/egg/pokeGenerator.js';
import { transactionForUser } from '../../src/utils/economy/transaction.js';

export const data = new SlashCommandBuilder().setName('eggme').setDescription('Receive a random egg');
export async function execute(interaction) {
    let userId = interaction.user.id;
    if(await transactionForUser(userId, -500, interaction)) return;
    let message = generateEggMessage(userId);
    await interaction.reply(message);
}