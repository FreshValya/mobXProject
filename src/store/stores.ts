import {MoviesStore} from '@store/MoviesStore';
import {SeriesStore} from '@store/SeriesStore';
import {AuthStore} from '@store/AuthStore';
import {WastedStore} from '@store/WastedStore';
import {ModalStore} from '@store/ModalStore';
import {TickerStore} from '@store/TickerStore';

export const stores = {
  $moviesStore: new MoviesStore(),
  $seriesStore: new SeriesStore(),
  $authStore: new AuthStore(),
  $wastedStore: new WastedStore(),
  $modalStore: new ModalStore(),
  $tickerStore: new TickerStore(),
};
