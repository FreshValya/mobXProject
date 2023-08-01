import {inject, observer} from 'mobx-react';
import {Component} from 'react';

import {ModalStore} from '@store/ModalStore';

import styles from './Modal.module.scss';

interface ModalProps {
  $modalStore?: ModalStore;
}

@inject('$modalStore')
@observer
export class Modal extends Component<ModalProps> {
  render() {
    return (
      <div className={styles.modalLayout}>
        <div className={styles.modalContent}>
          <button type="button" onClick={this.props.$modalStore.closeModal}>
            x
          </button>
          {this.props.$modalStore.modal.body}
        </div>
      </div>
    );
  }
}
