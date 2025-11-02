import 'dotenv/config';

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
  const guild = new Guild();
  const member = guild.members.fetch(userId);
  console.log(member);
  try {
    await member.roles.add(role);
  } catch (error) {
    console.error('Error adding role to member:', error);
  }
}