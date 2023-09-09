import { ChatInputCommandInteraction, CacheType } from "discord.js";
import puppeteer from "puppeteer-core";

export function delay(time:number) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

export async function main(userid:string, interaction: ChatInputCommandInteraction<CacheType>) {
    const browser = await puppeteer.launch({headless:true, executablePath:"/usr/bin/chromium", protocolTimeout:300_000})
    const page = await browser.newPage()
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36')

    await page.goto("https://covers.ai/ai-song-generator")
    await page.waitForSelector(".SongSelector-button")
    await page.click(".SongSelector-button")
    await delay(200)
    await page.waitForSelector(".SongSelector-upload")
    const [fileInput] = await Promise.all([page.waitForFileChooser(), page.click(".SongSelector-upload")])
    await fileInput.accept([`./temp/${userid}.opus`]);
    await page.waitForSelector(".ArtistsDropdown-select")
    await page.click(".ArtistsDropdown-select")
    await delay(200)
    await page.waitForSelector('div ::-p-text(Dio Brando AI 🎮 FAYK )');
    await page.click('div ::-p-text(Dio Brando AI 🎮 FAYK )')
    await delay(200)
    await page.waitForSelector(".Text-Input")
    await page.type(".Text-Input", "lolman420@kanker.gov")
    await delay(200)
    await page.waitForSelector(".PrivateSwitchBase-input")
    await page.click(".PrivateSwitchBase-input")
    await delay(200)
    await page.waitForSelector('button.CreationPage-footer-go:not([disabled])', {timeout:0});
    await page.click('button.CreationPage-footer-go:not([disabled])')
    await interaction.editReply("Generating...")

    await page.waitForSelector("button ::-p-text(Download)", {timeout:0})
    await page.click("button ::-p-text(Download)")
    await delay(200)
    await page.waitForSelector('p ::-p-text(Full Song)', {timeout:0})
    await page.click('p ::-p-text(Full Song)')

    await delay(10000)
    await interaction.editReply("Almost done.")
    await page.waitForSelector('.Cover-share-audio', {timeout:0})
    const crap = await page.$$eval('source', sources => sources.map(source => source.getAttribute('src')));
    const index = crap.indexOf("/starfield.mp4")
    if (index > -1) { // only splice array when item is found
        crap.splice(index, 1); // 2nd parameter means remove one item only
    }
    const response = await fetch(crap[0]);
    const result = await Bun.readableStreamToBlob(response.body)
    await Bun.write(Bun.file(`./temp/${userid}.mp3`), result)
    browser.close()
    await interaction.editReply("Uploading to Discord")
}