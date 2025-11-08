import 'dotenv/config';
import { getUserById } from '../models/userModel.js';
import { pokemonList } from '../const/pokemon_obtainable_through_eggme_list.js';
import { DISCORD_API_BASE_URL, DISCORD_POST_MESSAGE_ENDPOINT } from '../const/constants.js';
import { generateTraits } from './mechanics/egg/traitGenerator.js';

export function getRandomPokemon() {
  return pokemonList[Math.floor(Math.random() * pokemonList.length)];
}

//Function to generate egg and message for user.
export function generateEggMessage(userId) {
  let pokemon = getRandomPokemon();
  let numberOfTraits = Math.floor(Math.random() * 20);// Random number between 1 and 20 for traits
  let traits = []
  if (numberOfTraits <= 15) {
    traits = generateTraits(1);
    return `<@${userId}> has received a wild ${pokemon} egg! 🥚 It only has one special trait!: ***${capitalize(traits[0].name)}***`;
  }
  else if (numberOfTraits <= 19) {
    traits = generateTraits(2);
    return `<@${userId}> has received a wild ${pokemon} egg! 🥚 Woah! It has two special traits!: ***${capitalize(traits[0].name)}*** and ***${capitalize(traits[1].name)}***`;
  }
  traits = generateTraits(3);
  return `<@${userId}> has received a wild ${pokemon} egg! 🥚 Incredible! It has THREE special traits! What a freak!!!: ***${capitalize(traits[0].name)}***, ***${capitalize(traits[1].name)}***, and ***${capitalize(traits[2].name)}***`;
}

export async function addMemberToRole(userId, guild, role) {
  const member = guild.members.cache.get(userId);
  try {
    await member.roles.add(role);
  } catch (error) {
    console.error('Error adding role to member:', error);
  }
}

export async function generateProfileMessage(userId) {
  const userData = await getUserById(userId);
  if (userData.length === 0) {
    return `<@${userId}> is not in the RPG database yet!`;
  }
  return `**<@${userId}>'s RPG Profile**
Poké: ${userData[0].money} coins
`;
}

export async function postToChannel(channelId, body) {
  const url = `${DISCORD_API_BASE_URL}${DISCORD_POST_MESSAGE_ENDPOINT(channelId)}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bot ${process.env.DISCORD_TOKEN}`,
    },
    body: body
  });
  const responseText = await response.text();
  console.log(responseText);
  return response;
}

function capitalize(val){
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}