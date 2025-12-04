export interface TMDBMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string; // ISO date string
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TMDBMoviesResponse {
  page: number;
  results: Array<TMDBMovie>;
  total_pages: number;
  total_results: number;
}
