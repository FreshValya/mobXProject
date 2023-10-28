import {useState} from 'react';

import {favoritesApi} from '@api/favorites';

import {Poster} from '../../../../ui-kit/Poster';
import styles from './CinemaPanel.module.scss';

interface CinemaCardProps {
  id: number;
  type: 'movie' | 'tv';
  original_title: string;
  overview: string;
  poster_path: string;
}

export const CinemaPanel = ({id, type, original_title, overview, poster_path}: CinemaCardProps) => {
  const [isWatched, setIsWatched] = useState(false);

  const handleWatchStatusToggle = () => {
    setIsWatched((prev) => !prev);

    if (!isWatched) {
      favoritesApi.postFavorite(20175604, {media_type: type, media_id: id, favorite: true});
    } else {
      favoritesApi.postFavorite(20175604, {media_type: type, media_id: id, favorite: false});
    }
  };

  return (
    <div className={styles.cinemaPanel}>
      <div className={styles.info}>
        <div className={styles.title}>{original_title}</div>
        <div className={styles.overview}>{overview}</div>
      </div>
      <Poster
        poster_path={poster_path}
        original_title={original_title}
        isWatched={isWatched}
        onWatchStatusChange={handleWatchStatusToggle}
      />
    </div>
  );
};
