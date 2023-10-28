import LoadingSpin from '@assets/LoadingSpin.svg';
import styles from './Spinner.module.scss';

export const Spinner = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <LoadingSpin />
    </div>
  );
};
