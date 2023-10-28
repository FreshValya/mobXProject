import {inject, observer} from 'mobx-react';
import {Component} from 'react';

import {CinemaList} from '@components/CinemaList';

import {MoviesStore} from '@store/MoviesStore';
import {SeriesStore} from '@store/SeriesStore';

// FIXME: not working with import-sort plugin
import {Spinner} from '../../ui-kit/Spinner';
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

    if (!$moviesStore.isData || !$seriesStore.isData) {
      return <Spinner />;
    }

    return (
      <div className={styles.home}>
        <CinemaList mediaType="movie" media={$moviesStore.data.results} />
        <CinemaList mediaType="tv" media={$seriesStore.data.results} />
      </div>
    );
  }
}
