export const DISCORD_API_BASE_URL = "https://discord.com/api/v10";
export const DISCORD_POST_MESSAGE_ENDPOINT = (channelId) =>
  `/channels/${channelId}/messages`;

export const rarities = Object.freeze({
  COMMON: 1,
  UNCOMMON: 2,
  RARE: 3,
  VERY_RARE: 4
});

export const trait_list = [
    {
        name: "abnormal",
        rarity: rarities.COMMON,
        conflicts: []
    },
    {
        name: "variant",
        rarity: rarities.COMMON,
        conflicts: []
    },
    {
        name: "regional",
        rarity: rarities.COMMON,
        conflicts: []
    },
    {
        name: "petite",
        rarity: rarities.UNCOMMON,
        conflicts: ["giant"]
    },
    {
        name: "giant",
        rarity: rarities.UNCOMMON,
        conflicts: ["petite"]
    },
    {
        name: "hellish",
        rarity: rarities.RARE,
        conflicts: ["heavenly"]
    },
    {
        name: "heavenly",
        rarity: rarities.RARE,
        conflicts: ["hellish"]
    },
    {
      name: "mutated",
      rarity: rarities.VERY_RARE,
      conflicts: []
    }];