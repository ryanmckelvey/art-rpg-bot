import { SlashCommandBuilder } from 'discord.js';
import { postArtwork } from '../../src/models/artworkModel.js';

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
    postArtwork(userId, artwork.url);
    interaction.reply({ content: `Your artwork has been uploaded, <@${userId}>! Your artwork is now awaiting approval. ${artwork.url}`, flags: "Ephemeral" });
}