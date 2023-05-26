import { AccountsFetchService } from './services/accounts-fetch-service';
import { YoutubeApiService } from './services/youtube-api-service';
import { SpreadsheetService } from './services/spreadsheet-service';
import { ArrayService } from './services/array-service';
import { UpdateYoutubeChannels } from './services/update/update-youtube-channels';

async function fetchYouTubeChannelData() {
  try {
    // Retrieve YouTube accounts with sources
    const accounts = await AccountsFetchService.getYouTubeAccounts();
    // const IdList = accounts.map((item) => item.accounts);

    const { videosIDs, channel, videoDetails } =
      await YoutubeApiService.getVideoDetails(accounts[0].id);
    console.log('channel' + channel);
    console.log('videos' + videosIDs);
    console.log('videoDetails' + videoDetails);
    // const channelData = [];
    // for (const account of [accounts[0], accounts[1]]) {
    //   const data = await YoutubeApiService.fetchChannelData(account.id);
    //   if (data) {
    //     channelData.push(data);
    //   }
    // }

    return videoDetails;
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
    const accounts = await AccountsFetchService.getYouTubeAccounts();
    const channelData = [];
    for (const channel of accounts) {
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

// UCJjT4ZnGRvSpVifnBPuK3og,UCWAPDjZQXQSP8VzyZzOCdYg,UCaz6P8ai9Gc88LLAJczcr2A,UCJM4vxouZ1dZ6ScJ3juZCxw,UCByVLfjku3pKIlSSPz_r73g,UCkpMlAHv2GQYXObOnSRl4IA,UClZk9AcvHjOzbVtWp0kl9LQ,UCD1cUghDdB8BpAmZKxlktMw,UCbDJZ3Z3hg5GhaDCITNTvZw,UCBHNLE5SJXZdNjD432FwiOw,UCleTEP3qMR5wLoimJdKBi3g,UC3bsUqnbds9QdrW7H4Q2x8g,UCHyb7ZuC1MppCRqqrL6PZ1Q,UClu8SE58f7ofBfp8YusqJNw,UCnxBoVCZIbLqnaAg,zZsDLA,UCX9,cJy8dZWDI8hCnmahuLA,UC1GZRc8g,LImz4hE7AJusxg,UCf_HItERkRB3vnkWt2RSOLg,UCLdvZfZPIJtRzN_C5vO,IzA,UCZjtYEsg0uE9sd94O7ALgiA,UCPxpPT4b4vnDlX0sBGz3r4Q,UCYU2x_Ou168vbWcgH0c8t,g,UCbwfUqs5Y6_jblWJwMIfRzA,UCu4fNojL41FmQlTQ7eUPxRg,UCAvx9uxtvhnxNpnjutUei5A,UCtMGV3SHfVfiAt_w8lnmI8g,UC81PBuvIimtXQ8pDH7CcQkg,UCvPGXnZmXrkPrdYKRZ0M1bg,UCSysY_dKuN4JKVGu6BvUWAA,UCopcQiBf6yqBPSNFz9x4OYw,UC1HspxmchG6ED5m1q4Ggn3A,UC2qoLqo8RuV4P_88yhHCZIg,UCG13VOiwVu4m6l5oTI_1Rjg,UCtibJbLUaWLQdtV0ffww3Vw,UCBQnW5_C,6Ns6bob5ozacZg,UCyHNUKJOwkeKk7_dhPn8Atg,UCnJ0eygdnj20nk9h7TaSwHw,UC68MTA8Cmj72bMmvkGD5vAQ

// async function updateYouTubeChannels(accounts) {
//   try {
//     const tableHead = [
//       'ChannelId',
//       'Title',
//       'Description',
//       'Custom Url',
//       'Country',
//       'View count',
//       'Subscriber Count',
//       'Video count',
//     ];
//
//     const accountsIds = accounts.map((account) => account.id);
//     const listAccounts: string[][] = ArrayService.splitArrayIntoChunks(
//       accountsIds,
//       40,
//     );
//
//     const channelsList = Promise.all(
//       listAccounts.map(async (accounts) => {
//         const resp = await YoutubeApiService.getChannelsList(accounts);
//         return resp;
//       }),
//     );
//     const channelsListData = await channelsList;
//     const flattenedArray = [].concat(...channelsListData);
//     const values = flattenedArray.map((channel) => [
//       channel.id,
//       channel.snippet.title,
//       channel.snippet.description,
//       channel.snippet.customUrl,
//       channel.snippet.country,
//       channel.statistics.viewCount,
//       channel.statistics.subscriberCount,
//       channel.statistics.videoCount,
//     ]);
//     await SpreadsheetService.writeToSpreadsheet(
//       [tableHead, ...values],
//       'YouTubeChannels',
//     );
//
//     console.log(channelsList);
//   } catch (error) {
//     console.log(error);
//   }
// }

async function main() {
  try {
    const accounts = await AccountsFetchService.getYouTubeAccounts();
    // solved
    await UpdateYoutubeChannels.update(accounts);
    ///

    // const publishedAfter = '2023-05-01T00:00:00Z';
    // const publishedBefore = '2023-05-07T23:59:59Z';
    // const rangeVideoData = [];
    // for (const account of [
    //   'UCnJ0eygdnj20nk9h7TaSwHw',
    //   'UCyHNUKJOwkeKk7_dhPn8Atg',
    // ]) {
    //   const data = await YoutubeApiService.search(
    //     account,
    //     publishedAfter,
    //     publishedBefore,
    //   );
    //   if (data) {
    //     rangeVideoData.push(...data);
    //   } else {
    //     console.log('non search' + data);
    //   }
    // }
    //
    // console.log(rangeVideoData);
    // Fetch YouTube channel data
    // const channelData = await fetchYouTubeChannelData();
    // const details = await YoutubeApiService.fetchChannelData(channelData);
    // console.log(channelData[0].statistics);
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

    // const channelYouTubeData = await getVideosWithTimeRange(channelData);

    // const videoIds = channelYouTubeData.map((video) => video.id.videoId);
    // const videoDetails = await YoutubeApiService.fetchVideoDetails(videoIds);
    // console.log(videoDetails[0]);
    // const values = channelData.map((video) => [
    //   video.id,
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
