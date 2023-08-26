import {inject, observer} from 'mobx-react';
import {Component} from 'react';

import {CinemaPanels} from '@components/CinemaPanels';
import {Filters} from '@components/CinemaPanels/components/Filters';

import {DiscoveredMovies} from '@store/DiscoveredMovies';

import {Spinner} from '../../ui-kit/Spinner';
import styles from './Movies.module.scss';

interface DiscoverMoviesProps {
  $discoveredMovies?: DiscoveredMovies;
}

@inject('$discoveredMovies')
@observer
export class Movies extends Component<DiscoverMoviesProps> {
  componentDidMount() {
    this.props.$discoveredMovies.makeQuery({query: 'star wars'});
  }

  render() {
    const {$discoveredMovies} = this.props;

    return (
      <div className={styles.movies}>
        {/* TODO add normal placeholder */}
        <div className={styles.headline}>text for movies will be placed later..</div>
        <Filters />
        <div className={styles.foundedMovies}>
          {!$discoveredMovies.isData ? <Spinner /> : <CinemaPanels mediaType="movie" media={$discoveredMovies.data.results} />}
        </div>
      </div>
    );
  }
}
