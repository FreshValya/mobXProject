import {NavLink} from 'react-router-dom';

import styles from './Sidebar.module.scss';

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <NavLink to={'wasted'}>wasted</NavLink>
        </li>
        <li>
          <NavLink to={'cinema'}>movies</NavLink>
        </li>
        <li>
          <NavLink to={'cinema'}>series</NavLink>
        </li>
      </ul>
    </div>
  );
};
