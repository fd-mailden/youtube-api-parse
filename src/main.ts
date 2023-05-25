import { AccountsFetchService } from './services/accounts-fetch-service';
import { YoutubeApiService } from './services/youtube-api-service';
import { SpreadsheetService } from './services/spreadsheet-service';

async function fetchYouTubeChannelData() {
  try {
    // Retrieve YouTube accounts with sources
    const accounts = await AccountsFetchService.getYouTubeAccounts();

    const channelData = [];
    for (const account of [accounts[0], accounts[1]]) {
      const data = await YoutubeApiService.fetchChannelData(account.id);
      if (data) {
        channelData.push(data);
      }
    }

    return channelData;
    // return channelData;
  } catch (error) {
    console.error('Error fetching YouTube channel data', error);
    return [];
  }
}

// Пример использования
async function getVideosWithTimeRange(channels) {
  try {
    // Retrieve YouTube accounts with sources

    const channelData = [];
    for (const channel of channels) {
      const data = await YoutubeApiService.getVideosTheTimeRange(
        channel.id,
        '2023-05-01T00:00:00Z',
        '2023-05-07T23:59:59Z',
      );
      if (data) {
        channelData.push(data);
      }
    }

    return channelData;
    // return channelData;
  } catch (error) {
    console.error('Error getVideosWithTimeRange', error);
    return [];
  }
}

async function main() {
  try {
    // Fetch YouTube channel data
    const channelData = await fetchYouTubeChannelData();
    // console.log(channelData);
    // const values = channelData.map((channel) => [
    //   channel.id,
    //   channel.snippet.title,
    //   channel.snippet.description,
    //   channel.snippet.customUrl,
    //   channel.snippet.country,
    //   channel.statistics.viewCount,
    //   channel.statistics.subscriberCount,
    //   channel.statistics.videoCount,
    // ]);
    // await SpreadsheetService.writeToSpreadsheet(values, 'YouTubeChannels');

    // const channelYouTubeData = await YoutubeApiService.getVideosTheTimeRange(
    //   channelData.id,
    //   '2023-05-01T00:00:00Z',
    //   '2023-05-07T23:59:59Z',
    // );

    const channelYouTubeData = await getVideosWithTimeRange(channelData);

    // const videoIds = channelYouTubeData.map((video) => video.id.videoId);
    console.log(channelYouTubeData);
    // const videoDetails = await YoutubeApiService.fetchVideoDetails(videoIds);
    // console.log(videoDetails[0]);
    // const values = videoDetails.map((video) => [
    //   video.snippet.title,
    //   video.snippet.publishedAt,
    //   video.statistics.viewCount,
    //   video.statistics.favoriteCount,
    //   video.statistics.likeCount,
    //   video.statistics.commentCount,
    //   video.statistics.commentCount,
    // ]);
    // await SpreadsheetService.writeToSpreadsheet(values, 'YouTubePosts');
    // await SpreadsheetService.writeToSpreadsheet(values);
    // await updateAccountData(
    //   channelData.id,
    //   channelData.snippet.title,
    //   channelData.snippet.description,
    //   channelData.statistics.subscriberCount,
    //   channelData.statistics.videoCount,
    // );
  } catch (error) {
    console.error('Error:', error);
  }
}

main().catch(console.error);
