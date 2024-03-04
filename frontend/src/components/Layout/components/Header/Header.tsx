import {inject, observer} from 'mobx-react';
import {Component} from 'react';
import {NavLink} from 'react-router-dom';

import {AuthStore} from '@store/AuthStore';
import {ModalStore} from '@store/ModalStore';

import {SignInForm, SignOutForm} from '../../../Authorization';
import styles from './Header.module.scss';

interface HeaderProps {
  $authStore?: AuthStore;
  $modalStore?: ModalStore;
}

@inject('$authStore', '$modalStore')
@observer
export class Header extends Component<HeaderProps> {
  componentDidMount() {
    this.props.$authStore.verifyToken();
  }

  render() {
    const {$authStore, $modalStore} = this.props;
    const handleModal = () => {
      if ($authStore.isAuthenticated) {
        $modalStore.openModal(<SignOutForm />);
      } else {
        $modalStore.openModal(<SignInForm />);
      }
    };

    return (
      <div className={styles.header}>
        <NavLink to="/">home</NavLink>

        <button type="button" onClick={handleModal}>
          {$authStore.isAuthenticated ? 'sign out' : 'sign in'}
        </button>
      </div>
    );
  }
}
