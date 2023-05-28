import { ArrayService } from '../array-service';
import { YoutubeApiService } from '../youtube-api-service';
import { SpreadsheetService } from '../spreadsheet-service';
import {
  SHEETS_NAMES,
  YOUTUBE_CHANNELS_HEAD,
} from '../../config/table-headers';

const CHUNK_SIZE = 40;

class _UpdateYoutubeChannels {
  async update(accounts) {
    try {
      const accountsIds = accounts.map((account) => account.id);
      const listAccounts: string[][] = ArrayService.splitArrayIntoChunks(
        accountsIds,
        CHUNK_SIZE,
      );

      const channelsList = Promise.all(
        listAccounts.map(async (accounts) => {
          const resp = await YoutubeApiService.getChannelsList(accounts);
          return resp;
        }),
      );
      const channelsListData = await channelsList;

      const flattenedArray = ArrayService.flattened(channelsListData);

      if (!flattenedArray.length) throw new Error(`Channels does not exist!!!`);

      const inactive = accounts.filter(
        (obj) => !flattenedArray.some((item) => item.id === obj.id),
      );
      const inactiveList = inactive.map((item) => [item.id, 'inactive']);

      const values = flattenedArray.map((channel) => [
        channel.id,
        'active',
        channel.snippet.title,
        channel.snippet.description,
        channel.snippet.customUrl,
        channel.snippet.country,
        channel.statistics.viewCount,
        channel.statistics.subscriberCount,
        channel.statistics.videoCount,
      ]);

      await SpreadsheetService.clearSpreadsheet(SHEETS_NAMES.channels);
      await SpreadsheetService.writeToSpreadsheet(
        [YOUTUBE_CHANNELS_HEAD, ...values, ...inactiveList],
        SHEETS_NAMES.channels,
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export const UpdateYoutubeChannels = new _UpdateYoutubeChannels();
