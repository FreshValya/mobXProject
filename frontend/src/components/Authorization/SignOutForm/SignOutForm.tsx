import {inject, observer} from 'mobx-react';
import {Component, FormEvent} from 'react';

import {AuthStore} from '@store/AuthStore';
import {ModalStore} from '@store/ModalStore';

import styles from './SignOutForm.modules.scss';

interface LogoutFormProps {
  $authStore?: AuthStore;
  $modalStore?: ModalStore;
}

@inject('$authStore', '$modalStore')
@observer
export class SignOutForm extends Component<LogoutFormProps> {
  render() {
    const {$authStore, $modalStore} = this.props;

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      await $authStore.signOut();

      // TODO redirect to home page
      window.location.reload();

      $modalStore.closeModal();
    };

    return (
      <form onSubmit={handleSubmit} className={styles.logoutForm}>
        <div>are you sure?</div>
        <button type="submit">logout</button>
      </form>
    );
  }
}
