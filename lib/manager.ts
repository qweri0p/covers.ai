import { ChatInputCommandInteraction, CacheType, AttachmentBuilder} from "discord.js";
import { getYoutube } from "./youtube";
import { main } from './puppeteer';

export async function run(link:string, voice: string, interaction: ChatInputCommandInteraction<CacheType>) {
    await interaction.editReply("Downloading music from Youtube");
    // await interaction.reply("amogus")
    const metadata = await getYoutube(link, interaction.user.id);
    await interaction.editReply("Downloaded!\nNow loading covers.ai");
    await main(interaction.user.id, interaction, voice)
    const file = new AttachmentBuilder(`./temp/${interaction.user.id}.mp3`, {name:"music.mp3"})
    await interaction.followUp({content:`${metadata.title}\nRequested by <@${interaction.user.id}>\nVoice: ${voice}`, files:[file]})
}