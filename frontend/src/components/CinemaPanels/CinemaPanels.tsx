import {Movie} from '@api/movies';
import {TVShow} from '@api/series';

import styles from './CinemaPanels.module.scss';
import {CinemaPanel} from './components/CinemaPanel';

interface CinemaPanelsProps<T extends Movie | TVShow> {
  mediaType: 'movie' | 'tv';
  media: Array<T>;
}

export const CinemaPanels = ({mediaType, media}: CinemaPanelsProps<Movie | TVShow>) => {
  const panelTitle = mediaType === 'movie' ? 'movies' : mediaType;

  if (media?.length === 0) {
    return <div>no {panelTitle} found</div>;
  }

  return (
    <div className={styles.cinemaPanels}>
      {media.map((show) => (
        <CinemaPanel
          key={show.id}
          id={show.id}
          type={mediaType}
          original_title={mediaType === 'movie' ? (show as Movie).original_title : (show as TVShow).original_name}
          overview={show.overview}
          poster_path={show.poster_path}
          watched={show.watched}
        />
      ))}
    </div>
  );
};
