import { APIApplicationCommandOptionChoice, REST, Routes, SlashCommandBuilder } from 'discord.js';
import voices from './lib/voices.json'
import config from './config.json';

function choicesObjectBuilder(voices:voice[]) {
    let result:APIApplicationCommandOptionChoice<number>[] = [];
    voices.forEach(element => {
        result.push({
        name: element.command,
        value: voices.indexOf(element)
        })
    });
  return result
}

const cover = new SlashCommandBuilder()
    .setName('cover')
    .setDescription("Make someone ruin your music.")
    .addNumberOption(option=>
        option.setName('voice')
            .setDescription("Who should ruin the music?")
            .setRequired(true)
            .addChoices(...choicesObjectBuilder(voices))
    )
    .addStringOption(option=>
        option.setName('youtube')
            .setDescription("Youtube link to the music.")
            .setRequired(true)
    )

const github = new SlashCommandBuilder()
    .setName("github")
    .setDescription("Sends a link to the source code.")

let commands = []

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