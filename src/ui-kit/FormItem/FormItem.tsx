import cn from 'classnames';
import {ReactNode} from 'react';

import styles from './FormItem.module.scss';

interface FormItemProps {
  label: string;
  className?: string;
  children: ReactNode;
}
export const FormItem = ({label, className, children}: FormItemProps) => {
  return (
    <label className={cn(styles.formItem, className)}>
      {label}
      {children}
    </label>
  );
};
