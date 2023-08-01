import {Header} from './components/header';
import {Footer} from './components/footer';
import {Sidebar} from './components/sidebar';
import {Outlet} from 'react-router-dom';

import styles from './Layout.module.scss';
import {inject, observer} from 'mobx-react';
import {Component} from 'react';
import {Modal} from '@components/Modal/Modal';
import {ModalStore} from '@store/ModalStore';

interface LayoutProps {
  $modalStore?: ModalStore;
}

@inject('$modalStore')
@observer
export class Layout extends Component<LayoutProps> {
  render() {
    const isOpen = this.props.$modalStore.modal.open;

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
