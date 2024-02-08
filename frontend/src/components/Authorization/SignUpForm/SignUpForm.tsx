import {inject, observer} from 'mobx-react';
import {ChangeEventHandler, Component, FormEvent} from 'react';

import {SignInForm} from '@components/Authorization';

import {AuthStore} from '@store/AuthStore';
import {ModalStore} from '@store/ModalStore';

import styles from './SignUpForm.module.scss';

interface AuthorizationModalProps {
  $authStore?: AuthStore;
  $modalStore?: ModalStore;
}

@inject('$authStore', '$modalStore')
@observer
export class SignUpForm extends Component<AuthorizationModalProps> {
  state = {
    email: '',
    username: '',
    password: '',
  };

  handleEmail: ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({
      ...this.state,
      email: event.target.value,
    });
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

    const handleSignIn = () => {
      $modalStore.closeModal();
      $modalStore.openModal(<SignInForm />);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      await $authStore.signUp(this.state);

      $modalStore.closeModal();
    };

    return (
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.input}>
          <label htmlFor="email">email</label>
          <input id="email" value={this.state.email} onChange={this.handleEmail} type="text" />
        </div>
        <div className={styles.input}>
          <label htmlFor="username">username</label>
          <input id="username" value={this.state.username} onChange={this.handleUsername} type="text" />
        </div>
        <div className={styles.input}>
          <label htmlFor="password">password</label>
          <input id="password" value={this.state.password} onChange={this.handlePassword} type="password" />
        </div>
        <div className={styles.buttons}>
          <button type="button" onClick={handleSignIn}>
            sign in
          </button>
          <button type="submit">sign up</button>
        </div>
      </form>
    );
  }
}
