import {DateType, Model} from './Model';
import {database} from '../database';

export type WatchedCinemaType = {
  user_id: number;
  media_id: number;
  media_type: 'movie' | 'tv';
};
export class WatchedCinemaModel extends Model {
  static tableName = 'watched_cinema';

  public static async create<Payload>(data: Payload): Promise<WatchedCinemaType & DateType> {
    return super.insert<Payload, WatchedCinemaType>({
      ...data,
    });
  }

  // public static async getMoviesByUserId<
  //   // Select extends Array<keyof WatchedCinemaType>,
  //   // Payload extends Record<keyof WatchedCinemaType, WatchedCinemaType[keyof WatchedCinemaType]>,
  // >(user_id: number) {
  //   return database.table<WatchedCinemaType>(this.tableName).select('media_id').where({user_id, media_type: 'movie'});
  // }

  // const watchedMedia = await WatchedCinemaModel.select(['media_type', 'media_id'], {
  //       user_id: req.user.id,
  //       media_type,
  //     });

  public static async getMediaByUserIdAndMediaType(user_id: number, media_type: WatchedCinemaType['media_type']) {
    return database
      .table<WatchedCinemaType>(this.tableName)
      .select(['media_type', 'media_id'])
      .where({user_id, media_type});
  }
  public static async getMoviesByUserId(user_id: number) {
    return database
      .table<WatchedCinemaType>(this.tableName)
      .select('media_id')
      .where({user_id, media_type: 'movie'})
      .options({rowMode: 'array'})
      .then((rows) => rows.flat());
  }

  public static async getSeriesByUserId(user_id: number) {
    return database
      .table<WatchedCinemaType>(this.tableName)
      .select('media_id')
      .where({user_id, media_type: 'tv'})
      .options({rowMode: 'array'})
      .then((rows) => rows.flat());
  }
}
