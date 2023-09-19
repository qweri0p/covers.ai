import { ChatInputCommandInteraction, CacheType } from "discord.js";
import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({headless:true, executablePath:"/usr/bin/chromium", protocolTimeout:0})

export function delay(time:number) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
}

export async function main(userid:string, interaction: ChatInputCommandInteraction<CacheType>, voiceId: string) {
    const page = await browser.newPage()
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36')

    await page.goto("https://covers.ai/ai-song-generator")
    await delay(1000)
    await page.waitForSelector(".SongSelector-button")
    await delay(1000)
    await page.click(".SongSelector-button")
    await delay(1000)
    await page.waitForSelector(".SongSelector-upload")
    await delay(1000)
    const [fileInput] = await Promise.all([page.waitForFileChooser(), page.click(".SongSelector-upload")])
    await delay(1000)
    await fileInput.accept([`./temp/${userid}.opus`]);
    await delay(1000)
    await page.waitForSelector(".ArtistsDropdown-select")
    await delay(500)
    await page.click(".ArtistsDropdown-select")
    await delay(500)
    await page.waitForSelector(`div[data-artist-id='${voiceId}']`);
    await page.click(`div[data-artist-id='${voiceId}']`)
    await delay(500)
    await page.waitForSelector(".Text-Input")
    await delay(200)
    await page.$eval('input.Text-Input', el => el.value = '');
    await delay(200)
    await page.type("input.Text-Input", "lolman420@kanker.gov")
    await delay(500)
    await page.waitForSelector(".PrivateSwitchBase-input")
    await page.$eval('input.PrivateSwitchBase-input', async el => {if (el.checked === false) el.click()})
    await delay(500)
    await page.waitForSelector('button.CreationPage-footer-go:not([disabled])', {timeout:0});
    await page.click('button.CreationPage-footer-go:not([disabled])')
    console.log("Started generating cover.")
    await interaction.editReply("Generating...")

    await page.waitForSelector("button ::-p-text(Download)", {timeout:0})
    await delay(3000)
    await page.click("button ::-p-text(Download)")
    await delay(1000)
    await page.waitForSelector('p ::-p-text(Full Song)', {timeout:0})
    await delay(1000)
    await page.click('p ::-p-text(Full Song)')
    console.log("Generating full song.")

    await delay(10000)
    await interaction.editReply("Almost done.")
    await page.waitForSelector('source[type="audio/mpeg"]', {timeout:0})
    const crap = await page.$eval('source[type="audio/mpeg"]', element => element.getAttribute('src'));
    const response = await fetch(crap);
    const result = await Bun.readableStreamToBlob(response.body)
    await Bun.write(Bun.file(`./temp/${userid}.mp3`), result)
    page.close()
    await interaction.editReply("Uploading to Discord")
    console.log("Downloaded full cover.")
}