import { SlashCommandBuilder } from 'discord.js';
import { createUser, getUserById } from '../../src/models/userModel.js';
import { addMemberToRole } from '../../src/utils/utils.js';

export const data = new SlashCommandBuilder()
    .setName('addmetorpg')
    .setDescription('Get added to the RPG!');

export async function execute(interaction) {
    let replyMessage;
    console.log(`Adding player ${interaction.user.username} to the RPG...`);
    try {
        if ((await getUserById(interaction.user.id)).length > 0) {
            replyMessage = { content: `<@${interaction.user.id}> You're already in the RPG! Use /profile to check yourself out!`, flags: "Ephemeral" };
        }
        else {
            await createUser(interaction.user.id, interaction.user.username);
            addMemberToRole(interaction.user.id, interaction.guild, process.env.RPG_PLAYER_ROLE_ID);
            console.log(`Player ${interaction.user.username} added to the RPG database.`);
            replyMessage = { content: `Welcome <@${interaction.user.id}> to the Art RPG! You have been granted the RPG Player role!`};
        }
    }
    catch (error) {
        console.error('Error adding player to RPG database:', error);
        replyMessage = { content: `There was an error adding <@${interaction.user.id}> to the RPG database. Please try again later.`, flags: "Ephemeral" };
    }
    await interaction.reply(replyMessage);
}