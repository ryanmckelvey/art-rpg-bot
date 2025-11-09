import { MessagePayload } from "discord.js";

export async function approveArtwork(interaction) {
    const message = interaction.message;
    const imageUrl = interaction.message.components[1].items[0].media.data.url;
    const newComponents = [...message.components];
    newComponents.pop();
    const userId = message.components[0].data.content.split(/[@>]/)[1];
    const approvalStatus = interaction.customId.includes("approve") ? "Approved" : "Rejected";
    newComponents[0].data.content = `Artwork submitted by <@${userId}>: ${imageUrl} | Has been ${approvalStatus} by <@${interaction.user.id}>`
    const payload = MessagePayload.create(message).resolveBody();
    payload.body.components = newComponents;
    message.edit(payload);
}