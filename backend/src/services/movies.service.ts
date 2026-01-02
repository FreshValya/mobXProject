import {WatchedCinemaModel} from '../models/WatchedCinemaModel';
import {SearchMoviesDTO} from '../domain/interfaces/movies';
import {TMDBMovie, TMDBMoviesResponse} from '../domain/entities/TMDB/movies';
import {Movie} from '../domain/entities/movies';
import config from '../config/config';

export default class MoviesService {
  async popularMovies(userId: number) {
    const TMDBMoviesList = await fetch(`https://api.themoviedb.org/3/discover/movie`, {
      headers: {
        accept: 'application/json',
        Authorization: config.TMDB.authToken,
      },
    }).then((response) => response.json() as unknown as TMDBMoviesResponse);

    const movies = await this.markWatchedMovies(userId, TMDBMoviesList.results);

    return {movies};
  }

  async searchMovies(userId: number, searchMoviesParams: SearchMoviesDTO) {
    const searchParams = new URLSearchParams(searchMoviesParams);

    const TMDBMoviesList = await fetch(`https://api.themoviedb.org/3/search/movie?${searchParams}`, {
      headers: {
        accept: 'application/json',
        Authorization: config.TMDB.authToken,
      },
    }).then((response) => response.json() as unknown as TMDBMoviesResponse);

    const movies = await this.markWatchedMovies(userId, TMDBMoviesList.results);

    return {movies};
  }

  private async markWatchedMovies(userId: number, TMDBMovies: Array<TMDBMovie>) {
    const watchedMediaId = await WatchedCinemaModel.getMoviesByUserId(userId);

    return TMDBMovies.map<Movie>((TMDBMovie) => ({
      ...TMDBMovie,
      watched: watchedMediaId.includes(TMDBMovie.id),
    }));
  }
}
