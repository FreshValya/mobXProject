import {inject, observer} from 'mobx-react';
import {Component} from 'react';

import {WastedStore} from '@store/WastedStore';

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
    console.log(this.props.$wastedStore.isLoading, this.props.$wastedStore.data);

    return (
      <div>
        <div>Wasted time: {this.props.$wastedStore.totalLength}</div>
        <div>
          Total watched movies: {this.props.$wastedStore.totalMovies}, total time {this.props.$wastedStore.totalMoviesLength}, average time{' '}
          {this.props.$wastedStore.averageMoviesLength}
        </div>
        <div>
          Total watched series: {this.props.$wastedStore.totalSeries}, total time {this.props.$wastedStore.totalSeriesLength}, average time{' '}
          {this.props.$wastedStore.averageSeriesLength}
        </div>
      </div>
    );
  }
}
