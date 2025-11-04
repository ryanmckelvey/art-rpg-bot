import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('submitart')
    .setDescription('Submit your art for review by the RPG moderators.')
    .addAttachmentOption(option =>
        option.setName('artwork')
            .setDescription('The artwork file to submit')
            .setRequired(true));

export async function execute(interaction) {
    const artwork = interaction.options.getAttachment('artwork');
    if(!artwork.contentType || !artwork.contentType.startsWith('image/')) {
        await interaction.reply({ content: '⚠️ Please submit a valid image file! ⚠️', flags: "Ephemeral" });
        return;
    }
    const userId = interaction.user.id;
    const username = interaction.user.username;
    console.log(`User ${username} (ID: ${userId}) submitted artwork: ${artwork.url}`);
    interaction.reply({ content: `Nice fucking gay ahh looking art, <@${userId}>! Your artwork is beyond chopped. ${artwork.url}`, flags: "Ephemeral" });
}