import { YoutubeApiService } from '../youtube-api-service';
import { ArrayService } from '../array-service';
import { SpreadsheetService } from '../spreadsheet-service';
import { SHEETS_NAMES, YOUTUBE_VIDEO_HEAD } from '../../config/table-headers';

const CHUNK_SIZE = 50;

class _UpdateYoutubeVideos {
  async getVideosWithTimeRange(accounts, publishedAfter, publishedBefore) {
    try {
      const idList = accounts.map((item) => item.id);

      const videoPromises = [idList[0], idList[1]].map((channelId) =>
        YoutubeApiService.search(channelId, publishedAfter, publishedBefore),
      );

      const videoResponses = await Promise.all(videoPromises);
      const videoList = ArrayService.flattened(videoResponses);

      const videoIds = videoList.map((video) => video.id.videoId);

      const videoChunksList: string[][] = ArrayService.splitArrayIntoChunks(
        videoIds,
        CHUNK_SIZE,
      );

      const videoDetails = Promise.all(
        videoChunksList.map(async (video) => {
          const resp = await YoutubeApiService.fetchVideoDetails(video);
          return resp;
        }),
      );
      const channelsListData = await videoDetails;

      const videoDetailsList = ArrayService.flattened(channelsListData);

      if (!videoDetailsList.length) throw new Error(`Video does not exist!!!`);

      const values = videoDetailsList.map((video) => [
        video.id,
        video.snippet.channelId,
        video.snippet.title,
        video.snippet.publishedAt,
        video.statistics.viewCount,
        video.statistics.favoriteCount,
        video.statistics.likeCount,
        video.statistics.commentCount,
        video.statistics.commentCount,
      ]);
      // await SpreadsheetService.clearSpreadsheet(SHEETS_NAMES.posts);
      await SpreadsheetService.writeToSpreadsheet(
        [YOUTUBE_VIDEO_HEAD, ...values],
        SHEETS_NAMES.posts,
      );
    } catch (error) {
      console.error('Error get Videos With Time Range', error);
      return [];
    }
  }
}

export const UpdateYoutubeVideos = new _UpdateYoutubeVideos();
