import {Component, FormEvent} from 'react';
import {AuthStore} from '@store/AuthStore';
import {inject, observer} from 'mobx-react';
import {ModalStore} from '@store/ModalStore';

interface LogoutFormProps {
  $authStore?: AuthStore;
  $modalStore?: ModalStore;
}

@inject('$authStore', '$modalStore')
@observer
export class LogoutForm extends Component<LogoutFormProps> {
  render() {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      await this.props.$authStore.logout();

      this.props.$modalStore.closeModal();
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>are you sure?</div>
        <button type="submit">logout</button>
      </form>
    );
  }
}
