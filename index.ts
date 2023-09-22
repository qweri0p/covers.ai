import config from './config.json';
import discord from 'discord.js';
import {run} from './lib/manager';

const client = new discord.Client({intents: ["Guilds", "GuildMessages"]})

client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    client.user?.setPresence({
        activities: [{ name: "JoJo's Bizzare Adventure", type: discord.ActivityType.Watching }],
        status: 'online',
      });
      
});

let on = false;

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === 'cover') {
        if (on) {
            await interaction.reply("NO!\nI'M BUSY!\nLEAVE ME ALONE!\nFUCK YOU!")
        } else {
            await interaction.deferReply()
            on = true
            const link = interaction.options.getString('youtube', true)
            const voiceIndex = interaction.options.getNumber('voice', true)
            await run(link, voiceIndex, interaction)
            on = false
        }
    }
    else if (interaction.commandName === 'github') {
        await interaction.reply({content: "https://github.com/qweri0p/covers.ai\nGive stars pls (:", ephemeral:true})
    }
    else if (interaction.commandName === 'naughty') {
        if (on) {
            await interaction.reply("i'm a naughty cumslut (:")
            const qweriop = await client.users.fetch("354943770464354306")
            await qweriop.send("I've been a naughty bitch. Pls fix me.\nI was called naughty by "+interaction.user.username)
        } else {
            await interaction.reply("UR THE FUCKING BITCH YOU IDIOT!!!")
        }
    }
});

client.login(config.TOKEN)