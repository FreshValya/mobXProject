import {inject, observer} from 'mobx-react';
import {Component} from 'react';

import {WastedMovieStore} from '@store/WastedMovieStore';
import {WastedTVStore} from '@store/WastedTVStore';

import styles from './Wasted.module.scss';

interface WastedProps {
  $wastedMovieStore?: WastedMovieStore;
  $wastedTVStore?: WastedTVStore;
}

@inject('$wastedMovieStore', '$wastedTVStore')
@observer
export class Wasted extends Component<WastedProps> {
  componentDidMount() {
    this.props.$wastedMovieStore.getData();
    this.props.$wastedTVStore.getData();
  }

  render() {
    const {$wastedMovieStore, $wastedTVStore} = this.props;

    return (
      <div className={styles.wasted}>
        <div>total wasted time: {$wastedMovieStore.totalMoviesLength + $wastedTVStore.totalSeriesLength} min</div>
        <div>
          total watched movies: {$wastedMovieStore.totalMovies}, total time {$wastedMovieStore.totalMoviesLength} min,
          average time {$wastedMovieStore.averageMoviesLength} min
        </div>
        <div>
          total watched series: {$wastedTVStore.totalSeries}, total time {$wastedTVStore.totalSeriesLength} min, average
          time {$wastedTVStore.averageSeriesLength} min
        </div>
      </div>
    );
  }
}
