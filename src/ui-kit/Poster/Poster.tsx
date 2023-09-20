import styles from './Poster.module.scss';
import {WatchedButton} from './components/WatchedButton';

interface PosterProps {
  poster_path: string;
  original_title: string;
  isWatched: boolean;
  onWatchStatusChange: VoidFunction;
}
export const Poster = ({poster_path, original_title, isWatched, onWatchStatusChange}: PosterProps) => {
  //TODO fix images width - make identical

  return (
    <div className={styles.poster}>
      <WatchedButton isWatched={isWatched} className={styles.watchedButton} onClick={onWatchStatusChange} />
      <img src={'https://image.tmdb.org/t/p/w500' + poster_path} alt={original_title} className={styles.poster} />
    </div>
  );
};
