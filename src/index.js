import { join } from 'node:path';
import { readdirSync } from 'node:fs';
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'node:url';
import { Client, Collection, Events, GatewayIntentBits, Partials } from 'discord.js';
import { approveArtwork } from './utils/moderation/approveReject.js';

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

client.login(process.env.DISCORD_TOKEN);

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.commands = new Collection();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const foldersPath = join(__dirname, '../commands');
const commandFolders = readdirSync(foldersPath);
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        try {
            var fileUrl = pathToFileURL(filePath).href;
            var imported = await import(fileUrl);
            var command = imported.default ?? imported;

            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
        catch (error) {
            console.error(`Error importing command at ${filePath}:`, error);
        }
    }
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand() && interaction.type !== 3) {
        console.log("Error, unknown interaction", interaction);
        return;
    };

    if (interaction.isCommand()) {
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`Error executing ${interaction.commandName}\n`, error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
    else if (interaction.type === 3) {
        console.log("Resolving approval status for message: ", interaction.message.id);
        await approveArtwork(interaction);
    }
});

client.on(Events.MessageReactionAdd, async (reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the message reaction: ', error);
            return;
        }
    }
    if (reaction.message.channel.id === process.env.ART_REVIEW_CHANNEL_ID) {
        console.log(`Reaction added by ${user.username} to message ID: ${reaction.message.id}`);
    }
});