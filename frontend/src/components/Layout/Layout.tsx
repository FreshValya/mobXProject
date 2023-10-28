import {inject, observer} from 'mobx-react';
import {Component} from 'react';
import {Outlet} from 'react-router-dom';

import {ModalStore} from '@store/ModalStore';

import {Modal} from '../Modal/Modal';
import styles from './Layout.module.scss';
import {Footer} from './components/Footer';
import {Header} from './components/Header';
import {Sidebar} from './components/Sidebar';

interface LayoutProps {
  $modalStore?: ModalStore;
}

@inject('$modalStore')
@observer
export class Layout extends Component<LayoutProps> {
  render() {
    const {$modalStore} = this.props;
    const isOpen = $modalStore.modal.open;

    return (
      <>
        {isOpen && <Modal />}
        <div className={styles.layout}>
          <Header />
          <div className={styles.content}>
            <Sidebar />
            <main className={styles.main}>
              <Outlet />
            </main>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}
