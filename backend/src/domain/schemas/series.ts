import {z} from 'zod';

export const searchSeriesSchema = z.object({
  query: z.string(),
  first_air_date_year: z.int32().gte(1000).lte(9999).optional(),
  include_adult: z.enum(['true', 'false']).default('false'),
  language: z.string().default('en-US'),
  page: z.int32().default(1),
  year: z.int32().gte(1000).lte(9999).optional(),
});
