import YTDlpWrap from "yt-dlp-wrap"
const downloader = new YTDlpWrap()


export async function getYoutube(link:string, userid: string) {

    const metadata = await downloader.getVideoInfo(link)
    downloader
        .exec([link, '-x', '-o', `temp/${userid}`])

        .on('close', () => console.log(`Downloaded ${link} (${metadata.title}) to temp/${userid}.`));
    
    return metadata
}