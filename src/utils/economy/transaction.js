import { getUserById, updateUserMoney } from "../../models/userModel.js";

export async function transactionForUser(user, amount, interaction) {
    //This method will work as a sort of wrapper for other chat commands.
    //First we check if the amount changed is less than 0 i.e. taking money away.
    //If yes, then check if the user has enough money for the transaction.
    //Subtract the amount and carry on with the action
    //If no, return the interaction like "Ay yo, you aint got enough!!!"
    const player = await getUserById(user);
    const moneyToBe = player.money + amount; 
    if ((player.money + amount) < 0) {
        await interaction.reply({ content: `You don't have enough money for this action`, flags: 'Ephemeral' });
        return true; 
    }
    updateUserMoney(amount, user);
}