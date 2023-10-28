import {inject, observer} from 'mobx-react';
import {Component} from 'react';
import {NavLink} from 'react-router-dom';

import {TickerStore} from '@store/TickerStore';
import styles from './Footer.module.scss';

interface FooterProps {
  $tickerStore?: TickerStore;
}

@inject('$tickerStore')
@observer
export class Footer extends Component<FooterProps> {
  async componentDidMount() {
    await this.props.$tickerStore.makeQuery();
  }

  render() {
    const {$tickerStore} = this.props;

    return (
      <div className={styles.footer}>
        <NavLink to="about">about page</NavLink>

        <div className={styles.tickerWrap}>
          {$tickerStore.isData && (
            <div className={styles.ticker}>
              <div className={styles.ticker__item}>
                {$tickerStore.ticker.title} ({$tickerStore.ticker.releaseYear}): {$tickerStore.ticker.overview}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
