import 'dotenv/config';
import { getUserById } from '../models/userModel.js';
import { read, readFileSync } from 'node:fs';

export function getRandomPokemon() {
  const pokemonList = loadCsvToArray();
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

export async function addMemberToRole(userId, guild, role) {
  const member = guild.members.cache.get(userId);
  console.log("HERE: ", member.roles);
  try {
    await member.roles.add(role);
  } catch (error) {
    console.error('Error adding role to member:', error);
  }
}

export async function generateProfileMessage(userId) {
  const userData = await getUserById(userId);
  if(userData.length === 0) {
    return `<@${userId}> is not in the RPG database yet!`;
  }
  console.log("USER DATA: ", userData[0].money);
  return `**<@${userId}>'s RPG Profile**
Poké: ${userData[0].money} coins
`;
}

function loadCsvToArray(){
  const raw = readFileSync('src/assets/pokemon_obtainable_through_eggme_list.json', 'utf-8');
  const data = JSON.parse(raw);
  console.log(data);
  return data.pokemon;
}