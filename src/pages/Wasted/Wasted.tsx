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
        <div>Wasted time: {$wastedStore.totalLength}</div>
        <div>
          Total watched movies: {$wastedStore.totalMovies}, total time {$wastedStore.totalMoviesLength}, average time{' '}
          {$wastedStore.averageMoviesLength}
        </div>
        <div>
          Total watched series: {$wastedStore.totalSeries}, total time {$wastedStore.totalSeriesLength}, average time{' '}
          {$wastedStore.averageSeriesLength}
        </div>
      </div>
    );
  }
}
