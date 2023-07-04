import {PropsWithChildren} from 'react';
import {Header} from './components/header';
import {Footer} from './components/footer';
import {Sidebar} from './components/sidebar';
import {Outlet} from 'react-router-dom';

export const Layout = () => {
  return (
    <div>
      <Header />
      <div>
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};
