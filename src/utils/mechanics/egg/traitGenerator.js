import { trait_list, rarities } from "../../../const/constants.js";

export function generateTraits(n){
    let traits = [];
    let filtered_traits = [];
    let traitRarity;
    for(let i = 0; i < n; i++){
        let traitDice = Math.floor(Math.random() * 100);
        /*
        Common = 50%
        Uncommon = 30%
        Rare = 15%
        Very Rare = 5%
        */
       if(traitDice < 50){
        traitRarity = rarities.COMMON;
       }
       else if(traitDice >= 50 && traitDice < 80){
        traitRarity = rarities.UNCOMMON
       }
       else if(traitDice >= 80 && traitDice < 95){
         traitRarity = rarities.RARE
       }
       else{
        traitRarity = rarities.VERY_RARE
       }
       filtered_traits = trait_list.filter(t => t.rarity == traitRarity);
       let traitToBeAdded = filtered_traits[Math.floor(Math.random() * filtered_traits.length)];
       if(!traits.includes(traitToBeAdded) && !traitsWillConflict(traits, traitToBeAdded)){
            traits.push(traitToBeAdded);
       }
       else{
        i--
       }   
    }
    console.log(traits.length);
    return traits;
}

function traitsWillConflict(t, newTrait){
    if(t.length === 0) return false;
    let newTraitList = [...t, newTrait];
    let traitNames = newTraitList.map(trait => trait.name);
    console.log(traitNames);
    for(let j = 0; j < t.length; j++){
        if(traitNames.some(name => t[j].conflicts.includes(name))){
            console.log("A conflict was found: ", t)
            return true;
        }
    }
    return false;
}