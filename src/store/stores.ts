import {AuthStore} from '@store/AuthStore';
import {ModalStore} from '@store/ModalStore';
import {MoviesStore} from '@store/MoviesStore';
import {SeriesStore} from '@store/SeriesStore';
import {TickerStore} from '@store/TickerStore';
import {WastedStore} from '@store/WastedStore';

export const stores = {
  $moviesStore: new MoviesStore(),
  $seriesStore: new SeriesStore(),
  $authStore: new AuthStore(),
  $wastedStore: new WastedStore(),
  $modalStore: new ModalStore(),
  $tickerStore: new TickerStore(),
};
