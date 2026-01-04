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

    return {media};
  }

  async unmarkWatchedMedia({userId, mediaId, mediaType}: MarkMediadParams) {
    await WatchedCinemaModel.deleteBy({media_id: mediaId, media_type: mediaType, user_id: userId});
  }
}
