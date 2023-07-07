import {Header} from './components/header';
import {Footer} from './components/footer';
import {Sidebar} from './components/sidebar';
import {Outlet} from 'react-router-dom';

import styles from './Layout.module.scss';

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};
