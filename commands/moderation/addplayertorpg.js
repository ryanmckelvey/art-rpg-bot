import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder().setName('addplayertorpg').setDescription('Adds the selected player to the RPG.').addMentionableOption(option =>
    option.setName('player')
        .setDescription('The player to add to the RPG')
        .setRequired(true)
);

export async function execute(interaction) {
    const playerToBeAdded = interaction.options.getMentionable('player').user;
    console.log(`Adding player ${playerToBeAdded.username} to the RPG...`);
    await interaction.reply({ content: 'This command is under construction. 🚧', ephemeral: true });
}