import React, {ComponentType} from 'react';
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

export const router =
  (Component: ComponentType): any =>
  (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    return <Component {...props} router={{location, navigate, params, searchParams, setSearchParams}} />;
  };
