import {inject, observer} from 'mobx-react';
import {ChangeEventHandler, Component, FormEvent} from 'react';

import {AuthStore} from '@store/AuthStore';
import {ModalStore} from '@store/ModalStore';
import styles from './LoginForm.module.scss';

interface AuthorizationModalProps {
  $authStore?: AuthStore;
  $modalStore?: ModalStore;
}

@inject('$authStore', '$modalStore')
@observer
export class LoginForm extends Component<AuthorizationModalProps> {
  state = {
    username: 'FreshYoda',
    password: 'aF!3h5PhuPhFTja',
  };

  handleUsername: ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({
      ...this.state,
      username: event.target.value,
    });
  };

  handlePassword: ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({
      ...this.state,
      password: event.target.value,
    });
  };

  render() {
    const {$authStore, $modalStore} = this.props;

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      await $authStore.login(this.state);

      $modalStore.closeModal();
    };

    return (
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.input}>
          <label htmlFor="username">username</label>
          <input id="username" value={this.state.username} onChange={this.handleUsername} type="text" />
        </div>
        <div className={styles.input}>
          <label htmlFor="password">password</label>
          <input id="password" value={this.state.password} onChange={this.handlePassword} type="password" />
        </div>
        <button type="submit">login</button>
      </form>
    );
  }
}
