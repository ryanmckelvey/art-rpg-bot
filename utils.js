import 'dotenv/config';
import { Guild, GuildMember } from 'discord.js';

export async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = 'https://discord.com/api/v10/' + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  // Use fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
    },
    ...options
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

export async function InstallGlobalCommands(appId, commands) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    await DiscordRequest(endpoint, { method: 'PUT', body: commands });
  } catch (err) {
    console.error(err);
  }
}

export function getRandomPokemon() {
  const pokemonList = ['Bulbasaur', 'Charmander', 'Squirtle', 'Pikachu', 'Eevee', 'Jigglypuff', 'Meowth', 'Psyduck', 'Snorlax', 'Mewtwo'];
  return pokemonList[Math.floor(Math.random() * pokemonList.length)];
}

//Function to generate egg and message for user.
export function generateEggMessage(userId) {
  let pokemon = getRandomPokemon();
  let numberOfTraits = Math.floor(Math.random() * 20);// Random number between 1 and 20 for traits
  if (numberOfTraits <= 15) {
    return `<@${userId}> has received a wild ${pokemon} egg! 🥚 It only has one special trait!: ***Example Trait***`;
  }
  else if (numberOfTraits <= 19) {
    return `<@${userId}> has received a wild ${pokemon} egg! 🥚 Woah! It has two special traits!: ***Example Trait*** and ***Example Trait 2***`;
  }
  return `<@${userId}> has received a wild ${pokemon} egg! 🥚 Incredible! It has THREE special traits! What a freak!!!: ***Example Trait***, ***Example Trait 2***, and ***Example Trait 3***`;
}

export async function addMemberToRole(userId, guildId, role) {
  const guild = Guild.fetch(guildId);
  const member = guild.members.fetch(userId);
  console.log(member);
  try {
    await member.roles.add(role);
  } catch (error) {
    console.error('Error adding role to member:', error);
  }
}