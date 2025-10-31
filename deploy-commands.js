import { REST, Routes } from 'discord.js';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'path';

const commands = [];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const foldersPath = join(__dirname, 'commands');
const commandFolders = readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = join(foldersPath, folder);
    const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = join(commandsPath, file);
        try {
            const fileUrl = pathToFileURL(filePath).href;
            const imported = await import(fileUrl);
            const command = imported.default ?? imported;

            if ('data' in command && 'execute' in command) {
                commands.push(command.data);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
        catch (error) {
            console.error(`Error importing command at ${filePath}:`, error);
        }
    }
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        console.log(commands);
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.APP_ID, process.env.TEST_GUILD_ID),
            { body: commands },
        );
        const loadedCommands = await rest.get(
            Routes.applicationGuildCommands(process.env.APP_ID, process.env.TEST_GUILD_ID)
        );
        console.log("Commands loaded to guild:", loadedCommands);
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();