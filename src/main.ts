import { AccountsFetchService } from './services/accounts-fetch-service';
import { UpdateYoutubeChannels } from './services/update/update-youtube-channels';
import * as process from 'process';
import { InputDataService } from './services/input-data-service';
import { UpdateYoutubeVideos } from './services/update/update-youtube-videos';

async function main() {
  try {
    if (!process.argv[2] || !process.argv[3])
      throw new Error('Date start/end  NOT_FOUND !!!');

    const { publishedAfter, publishedBefore } =
      InputDataService.getPublishDateRange(process.argv[2], process.argv[3]);

    const accounts = await AccountsFetchService.getYouTubeAccounts();
    // Update Channels
    await UpdateYoutubeChannels.update(accounts);
    // Update Videos
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
