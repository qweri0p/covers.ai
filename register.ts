import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import config from './config.json';


const cover = new SlashCommandBuilder()
  .setName('cover')
  .setDescription("Make someone ruin your music.")
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
        {name: "koopa", value: "Koopa (Super Mario) AI FAYK 🐢"},
        {name: "trump", value: "Trump 🇺🇸 AI FAYK"},
        {name: "arnold", value: "Arnold Schwarzenegger 🇺🇸🇦🇹🏋🏻 AI FAYK"}
        )
  )
  .addStringOption(option=>
    option.setName('youtube')
      .setDescription("Youtube link to the music.")
      .setRequired(true)
  )

const github = new SlashCommandBuilder()
  .setName("github")
  .setDescription("Sends a link to the source code.")

const commands = [];

commands.push(cover.toJSON())
commands.push(github.toJSON())

const rest = new REST({ version: '10' }).setToken(config.TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(config.CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}