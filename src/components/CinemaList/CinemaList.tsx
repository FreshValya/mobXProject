import {Movie} from '@api/movies';
import {TVShow} from '@api/series';

import {CinemaCard} from '@components/CinemaList/components/CinemaCard/CinemaCard';

import styles from './CinemaList.module.scss';

interface CinemaPanelProps<T extends Movie | TVShow> {
  mediaType: 'movie' | 'tv';
  media: Array<T>;
}

export const CinemaList = <T extends Movie | TVShow>({mediaType, media}: CinemaPanelProps<T>) => {
  const panelTitle = mediaType === 'movie' ? 'movies' : mediaType;

  if (media?.length === 0) {
    return <div>nothing {panelTitle} found</div>;
  }

  return (
    <div className={styles.cinemaPanel}>
      <div className={styles.mediaType}>latest {panelTitle}</div>
      <div className={styles.cards}>
        {media.map((show) => (
          <CinemaCard
            key={show.id}
            id={show.id}
            type={mediaType}
            original_title={mediaType === 'movie' ? (show as Movie).original_title : (show as TVShow).original_name}
            poster_path={show.poster_path}
          />
        ))}
      </div>
    </div>
  );
};
