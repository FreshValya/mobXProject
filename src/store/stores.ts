import {AuthStore} from '@store/AuthStore';
import {DiscoveredMovies} from '@store/DiscoveredMovies';
import {ModalStore} from '@store/ModalStore';
import {MoviesStore} from '@store/MoviesStore';
import {SeriesStore} from '@store/SeriesStore';
import {TickerStore} from '@store/TickerStore';
import {WastedStore} from '@store/WastedStore';

export const stores = {
  $authStore: new AuthStore(),
  $discoveredMovies: new DiscoveredMovies(),
  $modalStore: new ModalStore(),
  $moviesStore: new MoviesStore(),
  $seriesStore: new SeriesStore(),
  $tickerStore: new TickerStore(),
  $wastedStore: new WastedStore(),
};
