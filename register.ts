import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import config from './config.json';


const ping = new SlashCommandBuilder()
    .setName('cover')
    .setDescription("Dio sings!")
    .addStringOption(option=>
        option.setName('youtube')
            .setDescription("Youtube link to the music.")
            .setRequired(true))
const commands = [];

commands.push(ping.toJSON())

const rest = new REST({ version: '10' }).setToken(config.TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(config.CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}