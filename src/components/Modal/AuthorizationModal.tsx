import {inject, observer} from 'mobx-react';
import {Component, FormEvent} from 'react';

import {AuthStore} from '@store/AuthStore';
import {ModalStore} from '@store/ModalStore';

interface AuthorizationModalProps {
  $authStore?: AuthStore;
  $modalStore?: ModalStore;
}

@inject('$authStore', '$modalStore')
@observer
export class AuthorizationModal extends Component<AuthorizationModalProps> {
  render() {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      await this.props.$authStore.login({username: 'FreshYoda', password: 'aF!3h5PhuPhFTja'});

      this.props.$modalStore.closeModal();
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">username</label>
          <input id="username" value="FreshYoda" type="text" />
        </div>
        <div>
          <label htmlFor="password">username</label>
          <input id="password" value="aF!3h5PhuPhFTja" type="password" />
        </div>
        <button type="submit">login</button>
      </form>
    );
  }
}
