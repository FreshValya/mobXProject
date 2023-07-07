import {NavLink} from 'react-router-dom';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      header<NavLink to={'/'}>home</NavLink>
    </div>
  );
};
