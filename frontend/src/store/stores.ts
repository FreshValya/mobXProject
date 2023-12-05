import {DiscoveredSeries} from '@store/DiscoveredSeries';
import {WastedTVStore} from '@store/WastedTVStore';

import {AuthStore} from './AuthStore';
import {DiscoveredMovies} from './DiscoveredMovies';
import {ModalStore} from './ModalStore';
import {MoviesStore} from './MoviesStore';
import {SeriesStore} from './SeriesStore';
import {TickerStore} from './TickerStore';
import {WastedMovieStore} from './WastedMovieStore';

export const stores = {
  $authStore: new AuthStore(),
  $discoveredMovies: new DiscoveredMovies(),
  $discoveredSeries: new DiscoveredSeries(),
  $modalStore: new ModalStore(),
  $moviesStore: new MoviesStore(),
  $seriesStore: new SeriesStore(),
  $tickerStore: new TickerStore(),
  $wastedMovieStore: new WastedMovieStore(),
  $wastedTVStore: new WastedTVStore(),
};
