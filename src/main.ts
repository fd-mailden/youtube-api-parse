import { AccountsFetchService } from './services/accounts-fetch-service';

import { UpdateYoutubeChannels } from './services/update/update-youtube-channels';

async function main() {
  try {
    const publishedAfter = '2023-05-01T00:00:00Z';
    const publishedBefore = '2023-05-07T23:59:59Z';
    const accounts = await AccountsFetchService.getYouTubeAccounts();
    // solved
    await UpdateYoutubeChannels.update(accounts);
    ///
    // solved
    // await UpdateYoutubeVideos.getVideosWithTimeRange(
    //   accounts,
    //   publishedAfter,
    //   publishedBefore,
    // );
  } catch (error) {
    console.error('Error:', error);
  }
}

main().catch(console.error);
