import styles from './Footer.module.scss';
import {NavLink} from 'react-router-dom';
import {Component} from 'react';
import {TickerStore} from '@store/TickerStore';
import {inject, observer} from 'mobx-react';

interface FooterProps {
  $tickerStore?: TickerStore;
}

@inject('$tickerStore')
@observer
export class Footer extends Component<FooterProps> {
  async componentDidMount() {
    await this.props.$tickerStore.getData();
  }

  render() {
    return (
      <div className={styles.footer}>
        <NavLink to={'about'}>about page</NavLink>
        {this.props.$tickerStore.ticker.title && (
          <div className={styles.tickerWrap}>
            <div className={styles.ticker}>
              <div className={styles.ticker__item}>
                {this.props.$tickerStore.ticker.title}({this.props.$tickerStore.ticker.releaseDate}): {this.props.$tickerStore.ticker.overview}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
