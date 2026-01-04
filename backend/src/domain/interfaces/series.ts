import {z} from 'zod';
import {searchSeriesSchema} from '../schemas/series';

export type SearchSeriesDTO = z.infer<typeof searchSeriesSchema>;
