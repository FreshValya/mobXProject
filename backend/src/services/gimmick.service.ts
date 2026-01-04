import {TMDBMovie} from '../domain/entities/TMDB/movies';
import config from '../config/config';

export default class GimmickService {
  async randomMovieSummary() {
    const randomID = Math.floor(Math.random() * 1000) + 1;

    const movie = await fetch(`https://api.themoviedb.org/3/movie/${randomID}`, {
      headers: {
        accept: 'application/json',
        Authorization: config.TMDB.authToken,
      },
    }).then((response) => response.json() as unknown as TMDBMovie);

    return {
      title: movie.title || '',
      overview: movie.overview || '',
      releaseYear: movie.release_date.split('-')[0] || '',
    };
  }
}
