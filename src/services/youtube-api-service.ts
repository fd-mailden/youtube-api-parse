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

  async fetchChannelData(channelId: string) {
    try {
      const apiKey = YOUTUBE_API_KEY; // Замените на ваш ключ API YouTube
      const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`;
      const response = await axios.get(url);
      return response.data.items[0];
    } catch (error) {
      console.error('Error fetching channel data', error);
      return null;
    }
  }

  async fetchVideoDetails(videoIds: string[]) {
    try {
      const apiKey = YOUTUBE_API_KEY;
      const videoIdsString = videoIds.join(',');
      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIdsString}&key=${apiKey}`;
      const response = await axios.get(url);
      return response.data.items;
    } catch (error) {
      console.error('Error fetching video details', error);
      return [];
    }
  }
}

export const YoutubeApiService = new _YoutubeApiService();
