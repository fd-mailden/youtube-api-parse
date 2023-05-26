import { youtube } from 'googleapis/build/src/apis/youtube';
import { YOUTUBE_CONFIG } from '../config/youtube';
import { youtube_v3 } from 'googleapis';
import axios from 'axios';
import { YOUTUBE_API_KEY } from '../config/variables';

interface VideoSnippet {
  title: string;
  publishedAt: string;
}

interface VideoStatistics {
  viewCount: string;
  favoriteCount: string;
  likeCount: string;
  commentCount: string;
}

interface VideoDetails {
  snippet: VideoSnippet;
  statistics: VideoStatistics;
}

class _YoutubeApiService {
  private youtubeGA = youtube({
    version: 'v3',
    auth: YOUTUBE_CONFIG.auth,
  });

  function;

  async getVideosTheTimeRange(
    channelId: string,
    publishedAfter: string,
    publishedBefore: string,
  ) {
    try {
      const params: youtube_v3.Params$Resource$Search$List = {
        channelId: channelId,
        part: ['snippet'],
        maxResults: 50,
        type: ['video'],
        publishedAfter: publishedAfter,
        publishedBefore: publishedBefore,
      };

      const response = await this.youtubeGA.search.list(params);

      const videos = response.data.items;
      return videos;
    } catch (error) {
      console.error('Error fetching videos', error);
      return [];
    }
  }

  async fetchVideoDetails(videoIds: string[]) {
    try {
      // const apiKey = YOUTUBE_API_KEY;
      // const videoIdsString = videoIds.join(',');
      // const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIdsString}&key=${apiKey}`;
      // const response = await axios.get(url);
      // return response.data;
      const list = videoIds.join(',');
      const response = await this.youtubeGA.videos.list({
        part: ['snippet,statistics'],
        id: [list],
      });

      return response.data.items;
    } catch (error) {
      console.error('Error fetching video details', error);
      return [];
    }
  }

  async search(
    channelId: string,
    publishedAfter: string,
    publishedBefore: string,
  ): Promise<youtube_v3.Schema$SearchResult[]> {
    try {
      const videosResponse = await this.youtubeGA.search.list({
        part: ['snippet'],
        channelId: channelId,
        maxResults: 5,
        order: 'date',
        publishedAfter,
        publishedBefore,
      });

      return videosResponse.data.items;
    } catch (error) {
      console.log('YoutubeApiService search Error: ' + error);
    }
  }

  async getChannelsList(
    channelIds: string[],
  ): Promise<youtube_v3.Schema$Channel[]> {
    try {
      const list = channelIds.join(',');
      const channelResponse = await this.youtubeGA.channels.list({
        part: ['snippet,statistics'],
        id: [list],
      });

      return channelResponse.data.items;
    } catch (error) {
      console.log('YoutubeApiService get Channels List Error: ' + error);
    }
  }

  async getVideoDetails(channelIds: string[]): Promise<{
    videosIDs: any;
    channel: any;
    videoDetails: any;
  }> {
    try {
      // Запрос на получение информации о канале
      const channelResponse = await this.getChannelsList(channelIds);
      const publishedAfter = '2023-05-01T00:00:00Z';
      const publishedBefore = '2023-05-07T23:59:59Z';
      const channel = channelResponse?.[0];

      // Запрос на получение последних видео канала
      const videosResponse = await this.search(
        channelIds[0],
        publishedAfter,
        publishedBefore,
      );

      const videosIDs: string[] = videosResponse.map((item) => item.id.videoId);

      const videoDetails = await this.fetchVideoDetails(videosIDs);

      return { videosIDs: videosResponse, channel, videoDetails };
    } catch (e) {
      console.log('getVideoDetails: ', e);
    }
  }
}

export const YoutubeApiService = new _YoutubeApiService();
