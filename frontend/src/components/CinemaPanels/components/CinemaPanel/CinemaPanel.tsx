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
  watched: boolean;
}

export const CinemaPanel = ({id, type, original_title, overview, poster_path, watched}: CinemaCardProps) => {
  const [isWatched, setIsWatched] = useState(watched);

  const handleWatchStatusToggle = () => {
    setIsWatched((prev) => !prev);

    if (isWatched) {
      favoritesApi.deleteFavorite({media_type: type, media_id: id});
    } else {
      favoritesApi.addFavorite(20175604, {media_type: type, media_id: id});
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
