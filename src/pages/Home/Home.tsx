import {inject, observer} from 'mobx-react';
import {Component} from 'react';

import {CinemaPanel} from '@components/CinemaPanel';
import {CinemaCard} from '@components/CinemaPanel/components/CinemaCard/CinemaCard';

import {MoviesStore} from '@store/MoviesStore';
import {SeriesStore} from '@store/SeriesStore';

import styles from './Home.module.scss';

interface HomeProps {
  $moviesStore?: MoviesStore;
  $seriesStore?: SeriesStore;
}

@inject('$moviesStore', '$seriesStore')
@observer
export class Home extends Component<HomeProps> {
  componentDidMount() {
    this.props.$moviesStore.getData();
    this.props.$seriesStore.getData();
  }

  render() {
    const {$moviesStore, $seriesStore} = this.props;

    // if ($moviesStore.isError === true || $moviesStore.isLoading === true || !('results' in $moviesStore.data)) {
    //   return <div>nothing movies found</div>;
    // }
    //
    // if ($seriesStore.isError === true || $seriesStore.isLoading === true || !('results' in $seriesStore.data)) {
    //   return <div>nothing series found</div>;
    // }

    const movies = 'results' in $moviesStore.data ? $moviesStore.data?.results : [];
    const tv = 'results' in $seriesStore.data ? $seriesStore.data?.results : [];

    return (
      <div className={styles.home}>
        <CinemaPanel mediaType="movie" media={movies} />
        <CinemaPanel mediaType="tv" media={tv} />
      </div>
    );
  }
}
