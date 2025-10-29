import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';


const EGG_COMMAND = {
  name: 'eggme',
  description: 'Receive a random pokemon egg',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const ALL_COMMANDS = [EGG_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
