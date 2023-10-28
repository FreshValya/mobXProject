import {useForm} from 'react-hook-form';

import {MovieFilter} from '@api/movies';
import {FormItem} from '../../../../ui-kit/FormItem';
import styles from './Filters.module.scss';

type FormValues = Omit<MovieFilter, 'query'>;

interface FiltersProps {
  data: FormValues;
  onSubmit: (data: FormValues) => void;
}

export const Filters = ({data, onSubmit}: FiltersProps) => {
  const form = useForm<FormValues>({
    defaultValues: {
      include_adult: data.include_adult,
      language: data.language,
      primary_release_year: data.primary_release_year,
      region: data.region,
      year: data.year,
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
      <h3 className={styles.headline}>filters</h3>
      <div className={styles.filters}>
        <FormItem label="language">
          <input {...form.register('language')} />
        </FormItem>
        <FormItem label="release year">
          <input {...form.register('primary_release_year')} />
        </FormItem>
        <FormItem label="region">
          <input {...form.register('region')} />
        </FormItem>
        <FormItem label="year">
          <input {...form.register('year')} />
        </FormItem>
        <FormItem label="include adult" className={styles.ageRestrict}>
          <input {...form.register('include_adult')} type="checkbox" />
        </FormItem>
      </div>
      <button type="submit" className={styles.submitButton}>
        apply
      </button>
    </form>
  );
};
