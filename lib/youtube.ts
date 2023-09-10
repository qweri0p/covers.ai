import YTDlpWrap from "yt-dlp-wrap"
const downloader = new YTDlpWrap()

export async function getYoutube(link:string, userid: string) {

    const metadata = await downloader.getVideoInfo(link)
    await downloader
        .execPromise([link, '-x', '-o', `temp/${userid}`])

        .finally(() => console.log(`Downloaded ${link} (${metadata.title}) to temp/${userid}.opus`));
    
    return metadata
}