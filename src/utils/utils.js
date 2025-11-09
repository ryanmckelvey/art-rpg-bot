import 'dotenv/config';
import { getUserById, getUserPrompts } from '../models/userModel.js';
import { DISCORD_API_BASE_URL, DISCORD_POST_MESSAGE_ENDPOINT } from '../const/constants.js';

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
  let promptsPrinted = "";

  if (userData.length === 0) {
    return `<@${userId}> is not in the RPG database yet!`;
  }

  if (userData[0].prompts === null || userData[0].prompts.length === 0) {
    promptsPrinted = "- *This player doesn't have any Pokemon yet, point and laugh!!!!*";
  }
  else {
    for (let i = 0; i < userData[0].prompts.length; i++) {
      promptsPrinted += `- ${userData[0].prompts[i]} \n`;
    }
  }
  return `**<@${userId}>'s RPG Profile**
Poké: ${userData[0].money} coins
Prompts: \n${promptsPrinted}`;
}

export async function getPromptsForUser(userId) {
  const row = await getUserPrompts(userId);
  if (row.prompts === null || row.prompts.length === 0) {
    console.log("Prompts array empty!!!");
    return `This player doesn't have any pokemon collected yet!`;
  }
  for (let i = 0; i < row.prompts.length; i++) {
    console.log(row.prompts[i]);
  }
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
  return response;
}

export function capitalize(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}