import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';


const EGG_COMMAND = {
  name: 'eggme',
  description: 'Receive a random pokemon egg',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const ADDPLAYERBYID_COMMAND = {
  name: 'addplayertorpg',
  description: 'Add another user as a player to the RPG.',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
  options: [
    {
      name: 'userid',
      description: 'The Discord user ID of the player to add to the RPG',
      type: 3, // STRING type
      required: true,
    },
  ],
};

const TEST_COMMAND = {
  name: 'test',
  description: 'Test command to check bot functionality',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const ALL_COMMANDS = [EGG_COMMAND, ADDPLAYERBYID_COMMAND, TEST_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
