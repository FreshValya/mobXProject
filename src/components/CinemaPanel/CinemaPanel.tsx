import {LatestMovie} from '@api/movies';
import {TVShow} from '@api/series';

import {CinemaCard} from '@components/CinemaPanel/components/CinemaCard/CinemaCard';

import styles from './CinemaPanel.module.scss';

interface CinemaPanelProps<T extends LatestMovie | TVShow> {
  mediaType: 'movie' | 'tv';
  media: Array<T>;
}

export const CinemaPanel = <T extends LatestMovie | TVShow>({mediaType, media}: CinemaPanelProps<T>) => {
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
            original_title={mediaType === 'movie' ? (show as LatestMovie).original_title : (show as TVShow).original_name}
            poster_path={show.poster_path}
          />
        ))}
      </div>
    </div>
  );
};
