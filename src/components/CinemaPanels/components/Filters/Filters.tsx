import {Controller, useForm} from 'react-hook-form';

import {FormItem} from '../../../../ui-kit/FormItem';
import styles from './Filters.module.scss';

interface FormValues {
  include_adult: boolean;
  language: string;
  primary_release_year: string;
  region: string;
  year: string;
}

interface FiltersProps {
  onSubmit: (data: Partial<FormValues>) => void;
}

export const Filters = ({onSubmit}: FiltersProps) => {
  const form = useForm<FormValues>({
    defaultValues: {include_adult: false, language: '', primary_release_year: '', region: '', year: ''},
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
      <h3 className={styles.headline}>filters</h3>
      <div className={styles.filters}>
        <Controller
          name="language"
          control={form.control}
          render={({field}) => (
            <FormItem label="language">
              <input {...field} />
            </FormItem>
          )}
        />
        <Controller
          name="primary_release_year"
          control={form.control}
          render={({field}) => (
            <FormItem label="release year">
              <input {...field} />
            </FormItem>
          )}
        />
        <Controller
          name="region"
          control={form.control}
          render={({field}) => (
            <FormItem label="region">
              <input {...field} />
            </FormItem>
          )}
        />
        <Controller
          name="year"
          control={form.control}
          render={({field}) => (
            <FormItem label="year">
              <input {...field} />
            </FormItem>
          )}
        />
        <Controller
          name="include_adult"
          control={form.control}
          render={({field}) => (
            <FormItem label="include adult" className={styles.ageRestrict}>
              <input type="checkbox" {...field} />
            </FormItem>
          )}
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        apply
      </button>
    </form>
  );
};
