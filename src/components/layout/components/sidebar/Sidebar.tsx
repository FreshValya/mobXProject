import {NavLink} from 'react-router-dom';

import styles from './Sidebar.module.scss';

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <NavLink to={'main'}>main page</NavLink>
        </li>
        <li>
          <NavLink to={'about'}>about page</NavLink>
        </li>
      </ul>
    </div>
  );
};
