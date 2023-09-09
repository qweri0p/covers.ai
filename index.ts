import config from './config.json';
import discord from 'discord.js';
import {run} from './lib/manager';

const client = new discord.Client({intents: ["Guilds", "GuildMessages"]})

client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    client.user?.setPresence({
        activities: [{ name: `JoJo's Bizzare Adventure`, type: discord.ActivityType.Watching }],
        status: 'online',
      });
      
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === 'cover') {
        await run(interaction.options.getString('youtube', true), interaction)
    }
});

client.login(config.TOKEN)