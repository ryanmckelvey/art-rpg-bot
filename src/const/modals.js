import { LabelBuilder, ModalBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, TextInputBuilder } from "discord.js";

export function approvalProcessModal() {
    const modal = new ModalBuilder().setTitle('Approval Process Modal').setCustomId('artApprovalModal');
    const selectMenu = new LabelBuilder()
        .setLabel('What Quality of Work is this?')
        .setStringSelectMenuComponent(
            new StringSelectMenuBuilder()
                .setCustomId('rewardSelector')
                .setPlaceholder('Quality of work')
                .addOptions(
                    new StringSelectMenuOptionBuilder()
                        .setLabel('Full, coloured drawing!')
                        .setValue('2500'),
                    new StringSelectMenuOptionBuilder()
                        .setLabel('Full, sketch!')
                        .setValue('2000')
                )
        );
    modal.addLabelComponents(selectMenu);
    return modal;
}