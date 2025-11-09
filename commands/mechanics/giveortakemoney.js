import { SlashCommandBuilder } from "discord.js";
import { updateUserMoney } from "../../src/models/userModel.js";

export const data = new SlashCommandBuilder()
    .setName('giveortakemoney')
    .setDescription('Give or take money depending on the value input')
    .addUserOption(option =>
        option.setName('player')
            .setDescription('Player whos Poké will be adjusted')
            .setRequired(true))
    .addNumberOption(option =>
        option.setName('amount')
            .setDescription('Amount money will be adjusted by')
            .setRequired(true));

export async function execute(interaction) {
    updateUserMoney(interaction.options.getNumber('amount'), interaction.options.getUser('player').id);
    await interaction.reply({ content: "This will be a command to adjust money of a target player", flags: "Ephemeral" });
}