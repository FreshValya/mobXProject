import {inject, observer} from 'mobx-react';
import {Component} from 'react';

import {WastedStore} from '@store/WastedStore';

import styles from './Wasted.module.scss';

interface WastedProps {
  $wastedStore?: WastedStore;
}

@inject('$wastedStore')
@observer
export class Wasted extends Component<WastedProps> {
  componentDidMount() {
    this.props.$wastedStore.getData();
  }

  render() {
    const {$wastedStore} = this.props;

    return (
      <div className={styles.wasted}>
        <div>total wasted time: {$wastedStore.totalLength} min</div>
        <div>
          total watched movies: {$wastedStore.totalMovies}, total time {$wastedStore.totalMoviesLength} min, average
          time {$wastedStore.averageMoviesLength} min
        </div>
        <div>
          total watched series: {$wastedStore.totalSeries}, total time {$wastedStore.totalSeriesLength} min, average
          time {$wastedStore.averageSeriesLength} min
        </div>
      </div>
    );
  }
}
