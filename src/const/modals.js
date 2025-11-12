import { LabelBuilder, ModalBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";

export function approvalProcessModal() {
    const modal = new ModalBuilder().setTitle('Approval Process Modal').setCustomId('artApprovalModal');
    const selectMenu = new LabelBuilder()
        .setLabel('Really approve this?')
        .setStringSelectMenuComponent(
            new StringSelectMenuBuilder()
            .setCustomId('testApprove')
            .setPlaceholder('yay or nay?')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                .setLabel('Yes!')
                .setValue('true')
                .setEmoji('✅'),
                new StringSelectMenuOptionBuilder()
                .setLabel('No!')
                .setValue('false')
                .setEmoji('❌')
            )
        );
    modal.addLabelComponents(selectMenu);
    return modal;
}