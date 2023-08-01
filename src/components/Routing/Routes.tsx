import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';
import {Home} from '@pages/Home';
import {About} from '@pages/About';
import {Cinema} from 'src/pages/Cinema';
import {Layout} from '@components/layout';
import {ErrorStub} from '@pages/ErrorStub';
import {NotFound} from '@pages/NotFound';
import {Wasted} from '@pages/Wasted';
import {Provider} from 'mobx-react';
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
      <Route path="cinema" element={<Cinema />} />
      <Route path="about" element={<About />} />
      <Route path="error" element={<ErrorStub />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);
