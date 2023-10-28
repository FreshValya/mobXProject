import {Provider} from 'mobx-react';
import {Route, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';

import {Layout} from '@components/Layout';

import {About} from '@pages/About';
import {ErrorStub} from '@pages/ErrorStub';
import {Home} from '@pages/Home';
import {Movies} from '@pages/Movies';
import {NotFound} from '@pages/NotFound';
import {TV} from '@pages/TV';
import {Wasted} from '@pages/Wasted';

import {stores} from '@store/stores';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <Provider {...stores}>
          <Layout />
        </Provider>
      }
    >
      <Route index element={<Home />} />
      <Route path="wasted" element={<Wasted />} />
      <Route path="cinema" element={<Movies />} />
      <Route path="tv" element={<TV />} />
      <Route path="about" element={<About />} />
      <Route path="error" element={<ErrorStub />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);
