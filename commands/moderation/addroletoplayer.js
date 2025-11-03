import { SlashCommandBuilder } from 'discord.js';
import { addMemberToRole } from '../../src/utils/utils.js';

export const data = new SlashCommandBuilder().setName('addroletoplayer')
    .setDescription('Adds the selected player to the player role.')
    .addUserOption(option =>
        option.setName('player')
            .setDescription('The player to add to the role')
            .setRequired(true))
    .setDefaultMemberPermissions(0);

export async function execute(interaction) {
    let replyMessage;
    const playerToBeAdded = interaction.options.getMentionable('player').user;
    try {
        addMemberToRole(playerToBeAdded.id, interaction.guild, process.env.RPG_PLAYER_ROLE_ID);
        console.log(`Player role added to ${playerToBeAdded.username}`);
        replyMessage = { content: `Player role added to <@${playerToBeAdded.id}>`, ephemeral: true };
    }
    catch (error) {
        console.error('Error adding player to RPG database:', error);
        replyMessage = { content: `There was an error adding <@${playerToBeAdded.id}> to the RPG player role. Please try again later.`, ephemeral: true };
    }
    await interaction.reply(replyMessage);
}