import {inject, observer} from 'mobx-react';
import {Component} from 'react';
import {NavLink} from 'react-router-dom';

import {AuthorizationModal} from '@components/Modal/AuthorizationModal';
import {LogoutForm} from '@components/Modal/LogoutForm';

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
    const handleModal = () => {
      console.log(this.props.$authStore.data.sessionId);
      if (this.props.$authStore.isAuthenticated) {
        this.props.$modalStore.openModal(<LogoutForm />);
      } else {
        this.props.$modalStore.openModal(<AuthorizationModal />);
      }
    };

    return (
      <div className={styles.header}>
        <NavLink to={'/'}>home</NavLink>

        <button type="button" onClick={handleModal}>
          {this.props.$authStore.isAuthenticated ? 'logout' : 'login'}
        </button>
      </div>
    );
  }
}
