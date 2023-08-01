import {action, makeObservable, observable} from 'mobx';
import {ReactNode} from 'react';

interface Modal {
  open: boolean;
  body: ReactNode | null;
}

export class ModalStore {
  constructor() {
    makeObservable(this);
  }

  @observable
  modal: Modal = {
    open: false,
    body: null,
  };

  @action
  openModal = (content: ReactNode) => {
    this.modal.open = true;
    this.modal.body = content;
  };

  @action
  closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
  };
}
