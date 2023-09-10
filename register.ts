import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import config from './config.json';


const ping = new SlashCommandBuilder()
    .setName('cover')
    .setDescription("Dio sings!")
    .addStringOption(option=>
      option.setName('voice')
        .setDescription("Who should ruin the music?")
        .setRequired(true)
        .addChoices(
          {name: "dio", value: "Dio Brando AI 🎮 FAYK "},
          {name: "mario", value: "Mario (Super Mario 64) AI FAYK🎮"},
          {name: "sonic", value: "Sonic the hedgehog AI FAYK 🦔🎮"},
          {name: "mrbeast", value: "Mr Beast 🇺🇸▶️ AI FAYK"},
          {name: "obama", value: "Obama 🇺🇸 AI FAYK"},
          {name: "geert", value: "Geert Wilders AI 🇳🇱🗳️ FAYK"},
          {name: "koopa", value: "Koopa (Super Mario) AI FAYK 🐢"}
          )
    )
    .addStringOption(option=>
      option.setName('youtube')
        .setDescription("Youtube link to the music.")
        .setRequired(true)
    )

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