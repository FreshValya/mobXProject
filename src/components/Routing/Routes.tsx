import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';
import {Home} from '@pages/Home';
import {About} from '@pages/About';
import {Main} from '@pages/Main';
import {Layout} from '@components/layout';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="main" element={<Main />} />
    </Route>,
  ),
);
