import { SlashCommandBuilder } from 'discord.js';
import { createUser, getUserById } from '../../src/models/userModel.js';
import { addMemberToRole } from '../../src/utils/utils.js';

export const data = new SlashCommandBuilder()
    .setName('addplayertorpg')
    .setDescription('Adds the selected player to the RPG.')
    .addUserOption(option =>
        option.setName('player')
            .setDescription('The player to add to the RPG')
            .setRequired(true))
    .setDefaultMemberPermissions(0);

export async function execute(interaction) {
    let replyMessage;
    const playerToBeAdded = interaction.options.getMentionable('player').user;
    console.log(`Adding player ${playerToBeAdded.username} to the RPG...`);
    try {
        if ((await getUserById(playerToBeAdded.id)).length > 0) {
            replyMessage = { content: `Player <@${playerToBeAdded.id}> is already in the RPG database!`, ephemeral: true };
        }
        else {
            await createUser(playerToBeAdded.id, playerToBeAdded.username);
            addMemberToRole(playerToBeAdded.id, interaction.guild, process.env.RPG_PLAYER_ROLE_ID);
            console.log(`Player ${playerToBeAdded.username} added to the RPG database.`);
            replyMessage = { content: `Welcome <@${playerToBeAdded.id}> to the Art RPG! You have been granted the RPG Player role!`, ephemeral: false };
        }
    }
    catch (error) {
        console.error('Error adding player to RPG database:', error);
        replyMessage = { content: `There was an error adding <@${playerToBeAdded.id}> to the RPG database. Please try again later.`, ephemeral: true };
    }
    await interaction.reply(replyMessage);
}