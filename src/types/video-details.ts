export interface VideoSnippet {
  title: string;
  publishedAt: string;
}

export interface VideoStatistics {
  viewCount: string;
  favoriteCount: string;
  likeCount: string;
  commentCount: string;
}

export interface VideoDetails {
  snippet: VideoSnippet;
  statistics: VideoStatistics;
}
