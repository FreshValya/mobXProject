import {inject, observer} from 'mobx-react';
import {Component} from 'react';

import {CinemaPanel} from '@components/CinemaPanel';

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
    this.props.$moviesStore.makeQuery();
    this.props.$seriesStore.makeQuery();
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

    const movies = $moviesStore.isData ? $moviesStore.data.results : [];
    const tv = $seriesStore.isData ? $seriesStore.data.results : [];

    return (
      <div className={styles.home}>
        <CinemaPanel mediaType="movie" media={movies} />
        <CinemaPanel mediaType="tv" media={tv} />
      </div>
    );
  }
}
