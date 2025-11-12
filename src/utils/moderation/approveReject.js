import { MessagePayload } from "discord.js";
import { approvalProcessModal } from '../../const/modals.js';

export async function approveArtwork(interaction) {
    const message = interaction.message;
    const imageUrl = interaction.message.components[1].items[0].media.data.url;
    const newComponents = [...message.components];
    const userId = message.components[0].data.content.split(/[@>]/)[1];
    const approvalStatus = interaction.customId.includes("approve") ? "Approved" : "Rejected";
    const payload = MessagePayload.create(message).resolveBody();

    if (approvalStatus === "Approved") {
        newComponents.pop();
        newComponents[0].data.content = `Artwork submitted by <@${userId}>: ${imageUrl} | Is being reviewed by <@${interaction.user.id}>`
        payload.body.components = newComponents;
        message.edit(payload);
        await interaction.showModal(approvalProcessModal());
    }

    newComponents[0].data.content = `Artwork submitted by <@${userId}>: ${imageUrl} | Has been ${approvalStatus} by <@${interaction.user.id}>`
    payload.body.components = newComponents;
    message.edit(payload);
}