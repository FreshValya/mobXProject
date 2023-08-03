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
    const {$modalStore} = this.props;

    return (
      <div className={styles.modalLayout}>
        <div className={styles.modalCard}>
          <button type="button" onClick={$modalStore.closeModal} className={styles.closeButton}>
            x
          </button>
          <div className={styles.modalContent}>{$modalStore.modal.body}</div>
        </div>
      </div>
    );
  }
}
