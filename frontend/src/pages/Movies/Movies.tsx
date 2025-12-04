import {debounce} from '@utils/debounce';
import {RouterProps, router} from '@utils/router';
import {inject, observer} from 'mobx-react';
import qs from 'query-string';
import {ChangeEvent, Component} from 'react';

import {MovieFilter} from '@api/movies';

import {CinemaPanels} from '@components/CinemaPanels';
import {Filters} from '@components/CinemaPanels/components/Filters';

import {DiscoveredMovies} from '@store/DiscoveredMovies';

import {Spinner} from '../../ui-kit/Spinner';
import styles from './Movies.module.scss';

interface DiscoverMoviesProps extends RouterProps {
  $discoveredMovies?: DiscoveredMovies;
}

interface DiscoverMoviesState {
  input: string;
}
@router
@inject('$discoveredMovies')
@observer
export class Movies extends Component<DiscoverMoviesProps, DiscoverMoviesState> {
  constructor(props: DiscoverMoviesProps) {
    super(props);

    this.props.$discoveredMovies.setParams(this.queryParams);
    this.state = {input: this.queryParams.query};
  }
  componentDidMount() {
    this.fetch();
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    this.setState({input: value});

    this.fetchSearchedMovies(value);
  };

  fetchSearchedMovies = debounce((query: string) => {
    this.queryParams = {query};

    this.props.$discoveredMovies.setParams({query});

    this.fetch();
  });

  get queryParams(): MovieFilter {
    const {searchParams} = this.props.router;

    const query = searchParams.get('query') ?? '';
    const include_adult = searchParams.get('include_adult') === 'true';
    const language = searchParams.get('language') ?? '';
    const primary_release_year = searchParams.get('primary_release_year') ?? '';
    const region = searchParams.get('region') ?? '';
    const year = searchParams.get('year') ?? '';

    return {query, include_adult, language, primary_release_year, region, year};
  }

  set queryParams(params: MovieFilter) {
    this.props.router.navigate({search: qs.stringify({...this.queryParams, ...params}, {skipEmptyString: true})});
  }

  fetchFilteredMovies = (data: MovieFilter) => {
    this.queryParams = data;

    this.props.$discoveredMovies.setParams(data);

    this.fetch();
  };

  fetch() {
    const {$discoveredMovies} = this.props;

    $discoveredMovies.makeQuery($discoveredMovies.params);
  }

  render() {
    const {$discoveredMovies} = this.props;

    return (
      <div className={styles.movies}>
        <div className={styles.moviesList}>
          <h3 className={styles.headline}>search movies</h3>
          <input type="search" placeholder="search" onChange={this.handleChange} value={this.state.input} />
          <div>
            {$discoveredMovies.isLoading && <Spinner />}
            {$discoveredMovies.isData && <CinemaPanels mediaType="movie" media={$discoveredMovies.data} />}
          </div>
        </div>
        <Filters data={this.queryParams} onSubmit={this.fetchFilteredMovies} />
      </div>
    );
  }
}
