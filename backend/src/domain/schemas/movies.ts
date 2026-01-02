import {z} from 'zod';

export const searchMoviesSchema = z.object({
  query: z.string(),
  include_adult: z
    .string()
    .regex(/^(true)|(false)$/)
    .default('false'),
  language: z.string().default('en-US'),
  primary_release_year: z.string().optional(),
  page: z.number().default(1),
  region: z.string().optional(),
  year: z.string().optional(),
});
