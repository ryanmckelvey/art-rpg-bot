import 'dotenv/config';
import express from 'express';
import {
  ButtonStyleTypes,
  InteractionResponseFlags,
  InteractionResponseType,
  InteractionType,
  MessageComponentTypes,
  verifyKeyMiddleware,
} from 'discord-interactions';
// import pool from './config/db.js';
import { generateEggMessage, getGuild } from './utils.js';
import { createUser, getUserById } from './models/userModel.js';


// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
  // Interaction id, type and data
  const { id, type, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;
    // "eggme" command
    if (name === 'eggme') {
      console.log(getGuild(req.body.guild_id));
      let userId = req.body.member.user.id;
      let message = generateEggMessage(userId);
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          flags: InteractionResponseFlags.IS_COMPONENTS_V2,
          components: [{
            type: MessageComponentTypes.TEXT_DISPLAY,
            content: message,
            allowed_mentions: { users: [userId] }
          }],
        },
      });
    }

    if (name === 'addplayertorpg') {
      let addedUserId = data.options[0].value;
      //Need to get the name of the user as well as the ID to add them to the DB properly.
      if ((await getUserById(addedUserId)).length == 0) {
        console.log('Adding new user to RPG with ID:', addedUserId);
        createUser(addedUserId, 'PlaceholderUsername');//TODO: Replace PlaceholderUsername with actual username fetch.
        let message = `${addedUserId} has been added as a player to the RPG! 🎉`;
        
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            flags: InteractionResponseFlags.IS_COMPONENTS_V2,
            components: [{
              type: MessageComponentTypes.TEXT_DISPLAY,
              content: message,
              allowed_mentions: { users: [addedUserId] }
            }],
          },
        });
      }
      else {
        console.log('User with ID:', addedUserId, 'is already a player in the RPG.');
        let message = `${addedUserId} is already a player in the RPG! ❗`;
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            flags: InteractionResponseFlags.EPHEMERAL,
            content: message,
          },
        });
      }
    }

    if(name === 'test'){
      console.log('Test command received successfully.');
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          flags: InteractionResponseFlags.EPHEMERAL,
          content: 'Test command received successfully! ✅',
        },
      });
    }

    console.error(`unknown command: ${name}`);
    return res.status(400).json({ error: 'unknown command' });
  }

  console.error('unknown interaction type', type);
  return res.status(400).json({ error: 'unknown interaction type' });
});

/*app.get('/', async (req, res) => {
  const client = await pool.query('SELECT current_database()');
  res.send('The database is: ' + client.rows[0].current_database);
});*/

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
