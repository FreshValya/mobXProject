import {TMDBMovie} from './TMDB/movies';

export interface Movie extends TMDBMovie {
  watched: boolean;
}
