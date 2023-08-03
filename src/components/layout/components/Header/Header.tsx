import {inject, observer} from 'mobx-react';
import {Component} from 'react';
import {NavLink} from 'react-router-dom';

import {LoginForm, LogoutForm} from '@components/Authorization';

import {AuthStore} from '@store/AuthStore';
import {ModalStore} from '@store/ModalStore';

import styles from './Header.module.scss';

interface HeaderProps {
  $authStore?: AuthStore;
  $modalStore?: ModalStore;
}

@inject('$authStore', '$modalStore')
@observer
export class Header extends Component<HeaderProps> {
  render() {
    const {$authStore, $modalStore} = this.props;
    const handleModal = () => {
      if ($authStore.isAuthenticated) {
        $modalStore.openModal(<LogoutForm />);
      } else {
        $modalStore.openModal(<LoginForm />);
      }
    };

    return (
      <div className={styles.header}>
        <NavLink to={'/'}>home</NavLink>

        <button type="button" onClick={handleModal}>
          {$authStore.isAuthenticated ? 'logout' : 'login'}
        </button>
      </div>
    );
  }
}
