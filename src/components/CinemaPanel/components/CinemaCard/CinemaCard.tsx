import {favoritesApi} from '@api/favorites';

import styles from './CinemaCard.module.scss';

interface CinemaCardProps {
  id: number;
  type: 'movie' | 'tv';
  original_title: string;
  poster_path: string;
}

export const CinemaCard = ({id, type, original_title, poster_path}: CinemaCardProps) => {
  const addFavorite = async () => {
    await favoritesApi.postFavorite(20175604, {media_type: type, media_id: id, favorite: true});
  };

  const removeFavorite = async () => {
    await favoritesApi.postFavorite(20175604, {media_type: type, media_id: id, favorite: false});
  };

  return (
    <div className={styles.cinemaCard}>
      <div className={styles.actions}>
        <div onClick={addFavorite}>+</div>
        <div onClick={removeFavorite}>-</div>
      </div>
      <img src={'https://image.tmdb.org/t/p/w500' + poster_path} alt={original_title} className={styles.poster} />
      {original_title}
    </div>
  );
};
