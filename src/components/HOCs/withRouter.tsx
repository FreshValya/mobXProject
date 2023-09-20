import {ComponentType} from 'react';
import {
  Location,
  NavigateFunction,
  Params,
  SetURLSearchParams,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

export interface RouterProps {
  router: {
    navigate: NavigateFunction;
    location: Location;
    readonly params: Params;
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
  };
}

export type PropsWithRouter<T> = T & RouterProps;
type OmitRouter<T> = Omit<T, keyof RouterProps>;

export function withRouter<T>(Component: ComponentType<OmitRouter<T> & RouterProps>) {
  // TODO EXTRA посмотреть как реакт понимает что хук вызывается из фун/класс компонента
  return (props: OmitRouter<T>) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    return <Component {...props} router={{location, navigate, params, searchParams, setSearchParams}} />;
  };
}
