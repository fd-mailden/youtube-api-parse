import { youtube } from 'googleapis/build/src/apis/youtube';
import { YOUTUBE_CONFIG } from '../config/youtube';
import { youtube_v3 } from 'googleapis';

const MAX_RESULTS = 50;

class _YoutubeApiService {
  private youtubeGA = youtube({
    version: 'v3',
    auth: YOUTUBE_CONFIG.auth,
  });

  async fetchVideoDetails(videoIds: string[]) {
    try {
      const list = videoIds.join(',');
      const response = await this.youtubeGA.videos.list({
        part: ['snippet,statistics'],
        id: [list],
        maxResults: MAX_RESULTS,
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
  ) {
    try {
      const videosResponse = await this.youtubeGA.search.list({
        part: ['snippet'],
        channelId: channelId,
        maxResults: MAX_RESULTS,
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
}

export const YoutubeApiService = new _YoutubeApiService();
