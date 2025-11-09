import { generateTraits } from './traitGenerator.js';
import { pokemonList } from '../../../const/pokemon_obtainable_through_eggme_list.js';
import { updateUserPrompts } from '../../../models/userModel.js';
import { capitalize } from '../../utils.js';

//Function to generate egg and message for user.
export function generateEggMessage(userId) {
    let pokemon = getRandomPokemon();
    let numberOfTraits = Math.floor(Math.random() * 20);// Random number between 1 and 20 for traits
    let traits = [];
    let message;
    if (numberOfTraits <= 15) {
        traits = generateTraits(1);
        message = `<@${userId}> has received a wild ${pokemon} egg! 🥚 It only has one special trait!: ***${capitalize(traits[0].name)}***`;
    }
    else if (numberOfTraits <= 19) {
        traits = generateTraits(2);
        message = `<@${userId}> has received a wild ${pokemon} egg! 🥚 Woah! It has two special traits!: ***${capitalize(traits[0].name)}*** and ***${capitalize(traits[1].name)}***`;
    }
    else {
        traits = generateTraits(3);
        message = `<@${userId}> has received a wild ${pokemon} egg! 🥚 Incredible! It has THREE special traits! What a freak!!!: ***${capitalize(traits[0].name)}***, ***${capitalize(traits[1].name)}***, and ***${capitalize(traits[2].name)}***`;
    }
    updateUserPrompts(`${pokemon} (${traits.map(t => t.name).toString()})`, userId);
    return message;
}

function getRandomPokemon() {
    return pokemonList[Math.floor(Math.random() * pokemonList.length)];
}