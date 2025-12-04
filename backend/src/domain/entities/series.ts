import {TMDBSeries} from './TMDB/series';

export interface Series extends TMDBSeries {
  watched: boolean;
}
