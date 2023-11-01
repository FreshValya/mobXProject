import {debounce} from '@utils/debounce';
import {RouterProps, router} from '@utils/router';
import {inject, observer} from 'mobx-react';
import qs from 'query-string';
import {ChangeEvent, Component} from 'react';

import {SeriesFilter} from '@api/series';

import {CinemaPanels} from '@components/CinemaPanels';
import {Filters} from '@components/CinemaPanels/components/Filters';

import {DiscoveredSeries} from '@store/DiscoveredSeries';

import {Spinner} from '../../ui-kit/Spinner';
import styles from './TV.module.scss';

interface DiscoverTVProps extends RouterProps {
  $discoveredSeries?: DiscoveredSeries;
}

interface DiscoverTVState {
  input: string;
}
@router
@inject('$discoveredSeries')
@observer
export class TV extends Component<DiscoverTVProps, DiscoverTVState> {
  constructor(props: DiscoverTVProps) {
    super(props);

    this.props.$discoveredSeries.setParams(this.queryParams);
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

    this.props.$discoveredSeries.setParams({query});

    this.fetch();
  });

  get queryParams(): SeriesFilter {
    const {searchParams} = this.props.router;

    const query = searchParams.get('query') ?? '';
    const include_adult = searchParams.get('include_adult') === 'true';
    const language = searchParams.get('language') ?? '';
    const primary_release_year = searchParams.get('primary_release_year') ?? '';
    const region = searchParams.get('region') ?? '';
    const year = searchParams.get('year') ?? '';

    return {query, include_adult, language, primary_release_year, region, year};
  }

  set queryParams(params: SeriesFilter) {
    this.props.router.navigate({search: qs.stringify({...this.queryParams, ...params}, {skipEmptyString: true})});
  }

  fetchFilteredMovies = (data: SeriesFilter) => {
    this.queryParams = data;

    this.props.$discoveredSeries.setParams(data);

    this.fetch();
  };

  fetch() {
    const {$discoveredSeries} = this.props;

    $discoveredSeries.makeQuery($discoveredSeries.params);
  }

  render() {
    const {$discoveredSeries} = this.props;

    return (
      <div className={styles.series}>
        <div className={styles.seriesList}>
          <h3 className={styles.headline}>search movies</h3>
          <input type="search" placeholder="search" onChange={this.handleChange} value={this.state.input} />
          <div>
            {$discoveredSeries.isLoading && <Spinner />}
            {$discoveredSeries.isData && <CinemaPanels mediaType="tv" media={$discoveredSeries.data.results} />}
          </div>
        </div>
        <Filters data={this.queryParams} onSubmit={this.fetchFilteredMovies} />
      </div>
    );
  }
}
