import styles from './Home.module.scss';
import {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {MoviesStore} from '@store/MoviesStore';
import {SeriesStore} from '@store/SeriesStore';
import {CinemaCard} from '@components/CinemaCard/CinemaCard';

interface HomeProps {
  $moviesStore?: MoviesStore;
  $seriesStore?: SeriesStore;
}

@inject('$moviesStore', '$seriesStore')
@observer
export class Home extends Component<HomeProps> {
  componentDidMount() {
    this.props.$moviesStore.getData();
    this.props.$seriesStore.getData();
  }

  render() {
    if (this.props.$moviesStore.isError === true || this.props.$moviesStore.isLoading === true || !('results' in this.props.$moviesStore.data)) {
      return <div>nothing movies found</div>;
    }

    if (this.props.$seriesStore.isError === true || this.props.$seriesStore.isLoading === true || !('results' in this.props.$seriesStore.data)) {
      console.log('there', this.props.$seriesStore);
      return <div>nothing series found</div>;
    }

    return (
      <div className={styles.home}>
        <div>movies</div>
        <ul className={styles.cinemaList}>
          {this.props.$moviesStore.data.results.map((movie) => (
            <CinemaCard id={movie.id} type={'movie'} original_title={movie.original_title} poster_path={movie.poster_path} />
          ))}
        </ul>
        <div>series</div>
        <ul className={styles.cinemaList}>
          {this.props.$seriesStore?.data?.results.map((series) => (
            <CinemaCard id={series.id} type={'tv'} original_title={series.original_name} poster_path={series.poster_path} />
          ))}
        </ul>
      </div>
    );
  }
}
