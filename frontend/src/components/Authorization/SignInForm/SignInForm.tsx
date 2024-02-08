import {inject, observer} from 'mobx-react';
import {ChangeEventHandler, Component, FormEvent} from 'react';

import {SignUpForm} from '@components/Authorization/SignUpForm';

import {AuthStore} from '@store/AuthStore';
import {ModalStore} from '@store/ModalStore';

import styles from './SignInForm.module.scss';

interface AuthorizationModalProps {
  $authStore?: AuthStore;
  $modalStore?: ModalStore;
}

@inject('$authStore', '$modalStore')
@observer
export class SignInForm extends Component<AuthorizationModalProps> {
  state = {
    email: '',
    password: '',
  };

  handleEmail: ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({
      ...this.state,
      email: event.target.value,
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

    const handleSignUp = () => {
      $modalStore.closeModal();
      $modalStore.openModal(<SignUpForm />);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      await $authStore.signIn(this.state);

      $modalStore.closeModal();
    };

    return (
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.input}>
          <label htmlFor="email">email</label>
          <input id="email" value={this.state.email} onChange={this.handleEmail} type="text" />
        </div>
        <div className={styles.input}>
          <label htmlFor="password">password</label>
          <input id="password" value={this.state.password} onChange={this.handlePassword} type="password" />
        </div>
        <div className={styles.buttons}>
          <button type="button" onClick={handleSignUp}>
            sign up
          </button>
          <button type="submit">sign in</button>
        </div>
      </form>
    );
  }
}
