import {WatchedCinemaModel} from '../models/WatchedCinemaModel';
import config from '../config/config';
import {SeriesDetails} from '../domain/entities/TMDB/series';
import {MovieDetails} from '../domain/entities/TMDB/movies';
import {MediaType} from '../domain/interfaces/watched';

type MarkMediadParams = {userId: number; mediaId: number; mediaType: MediaType};

export default class WatchedService {
  async markMediaAsWatched({userId, mediaId, mediaType}: MarkMediadParams) {
    await WatchedCinemaModel.create({user_id: userId, media_id: mediaId, media_type: mediaType});
  }

  async watchedMedia(userId: number, mediaType: MediaType) {
    const watchedMedia = await WatchedCinemaModel.getMediaByUserIdAndMediaType(userId, mediaType);

    const media = await Promise.all(
      watchedMedia.map((media) =>
        fetch(`https://api.themoviedb.org/3/${media.media_type}/${media.media_id}`, {
          headers: {
            accept: 'application/json',
            Authorization: config.TMDB.authToken,
          },
        }).then((response) => response.json() as unknown as SeriesDetails | MovieDetails),
      ),
    );

    if (mediaType === 'movie') {
      const moviesRuntime = [];

      (media as Array<MovieDetails>).forEach((movie) => {
        moviesRuntime.push(movie.runtime);
      });

      const totalMoviesRuntime = moviesRuntime.reduce((prev, curr) => prev + curr, 0);
      const averageMoviesRuntime = parseFloat((totalMoviesRuntime / moviesRuntime.length).toFixed(2)) || 0;

      return {
        numberOfMedia: moviesRuntime.length,
        totalRuntime: totalMoviesRuntime,
        averageRuntime: averageMoviesRuntime,
      };
    }

    if (mediaType === 'tv') {
      const seriesRuntime = [];

      (media as Array<SeriesDetails>).forEach((series) => {
        const avgEpisodeRuntime = series.episode_run_time.reduce((prev, curr) => prev + curr, 0);

        seriesRuntime.push(series.number_of_episodes * avgEpisodeRuntime);
      });

      const totalSeriesRuntime = seriesRuntime.reduce((prev, curr) => prev + curr, 0);
      const averageSeriesRuntime = parseFloat((totalSeriesRuntime / seriesRuntime.length).toFixed(2)) || 0;

      return {
        numberOfMedia: seriesRuntime.length,
        totalRuntime: totalSeriesRuntime,
        averageRuntime: averageSeriesRuntime,
      };
    }
  }

  async unmarkWatchedMedia({userId, mediaId, mediaType}: MarkMediadParams) {
    await WatchedCinemaModel.deleteBy({media_id: mediaId, media_type: mediaType, user_id: userId});
  }
}
