import {useState} from 'react';

import {favoritesApi} from '@api/favorites';

import {Poster} from '../../../../ui-kit/Poster';
import styles from './CinemaCard.module.scss';

interface CinemaCardProps {
  id: number;
  type: 'movie' | 'tv';
  original_title: string;
  poster_path: string;
  watched: boolean;
}

export const CinemaCard = ({id, type, original_title, poster_path, watched = false}: CinemaCardProps) => {
  //TODO rewire state - implement in mobx
  const [isWatched, setIsWatched] = useState(watched);

  const handleWatchStatusToggle = () => {
    setIsWatched((prev) => !prev);

    if (!isWatched) {
      favoritesApi.postFavorite(20175604, {media_type: type, media_id: id, favorite: true});
    } else {
      favoritesApi.postFavorite(20175604, {media_type: type, media_id: id, favorite: false});
    }
  };

  return (
    <div className={styles.cinemaCard}>
      <Poster
        poster_path={poster_path}
        original_title={original_title}
        isWatched={isWatched}
        onWatchStatusChange={handleWatchStatusToggle}
      />
      {original_title}
    </div>
  );
};
