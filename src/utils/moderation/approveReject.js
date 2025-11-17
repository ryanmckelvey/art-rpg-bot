import { MessagePayload } from "discord.js";
import { approvalProcessModal } from '../../const/modals.js';
import { transactionForUser } from '../economy/transaction.js';

export async function approveArtwork(interaction) {
    const message = interaction.message;
    const imageUrl = interaction.message.components[1].items[0].media.data.url;
    const newComponents = [...message.components];
    const userId = message.components[0].data.content.split(/[@>]/)[1];
    const approvalStatus = interaction.customId.includes("approve") ? "Approved" : "Rejected";
    const payload = MessagePayload.create(message).resolveBody();
    newComponents.pop();

    if (approvalStatus === "Approved") {
        newComponents[0].data.content = `Artwork submitted by <@${userId}>: ${imageUrl} | Is being reviewed by <@${interaction.user.id}>`
        payload.body.components = newComponents;
        message.edit(payload);
        await interaction.showModal(approvalProcessModal());
    }

    else {
        console.log(approvalStatus);
        newComponents[0].data.content = `Artwork submitted by <@${userId}>: ${imageUrl} | Has been ${approvalStatus} by <@${interaction.user.id}>`
        payload.body.components = newComponents;
        message.edit(payload);
    }

}

export async function resolveModalSubmission(interaction) {
    const message = interaction.message;
    const imageUrl = interaction.message.components[1].items[0].media.data.url;
    const userId = message.components[0].data.content.split(/[@>]/)[1];

    transactionForUser(userId, interaction.fields.fields.get('rewardSelector').values[0]);
    await interaction.reply({ content: `Artwork submitted by <@${userId}>: ${imageUrl} | Has been Approved by <@${interaction.user.id}>`});
    message.delete(message.id);
}