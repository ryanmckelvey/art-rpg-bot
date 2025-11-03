import { SlashCommandBuilder } from 'discord.js';
import { generateProfileMessage } from '../../src/utils/utils.js';

export const data = new SlashCommandBuilder()
    .setName('profile')
    .setDescription('View your RPG profile or that of another player.')
    .addUserOption(option =>
        option.setName('player')
            .setDescription('The player whose profile you want to view')
            .setRequired(false));

export async function execute(interaction) {
    let userId;
    const mentionedUser = interaction.options.getUser('player');
    if (mentionedUser) {
        userId = mentionedUser.id;
    }
    else {
        userId = interaction.user.id;
    }
    let message = await generateProfileMessage(userId);
    await interaction.reply({ content: message, ephemeral: mentionedUser ? true : false });
}