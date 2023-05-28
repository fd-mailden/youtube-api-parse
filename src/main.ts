import { AccountsFetchService } from './services/accounts-fetch-service';
import { YoutubeApiService } from './services/youtube-api-service';
import { SpreadsheetService } from './services/spreadsheet-service';
import { ArrayService } from './services/array-service';
import { UpdateYoutubeVideos } from './services/update/update-youtube-videos';

async function main() {
  try {
    const publishedAfter = '2023-05-01T00:00:00Z';
    const publishedBefore = '2023-05-07T23:59:59Z';
    const accounts = await AccountsFetchService.getYouTubeAccounts();
    // solved
    // await UpdateYoutubeChannels.update(accounts);
    ///
    await UpdateYoutubeVideos.getVideosWithTimeRange(
      accounts,
      publishedAfter,
      publishedBefore,
    );
  } catch (error) {
    console.error('Error:', error);
  }
}

main().catch(console.error);
