import {z} from 'zod';
import {mediaTypeSchema, watchedMediaSchema} from '../schemas/watched';

export type MediaType = z.infer<typeof mediaTypeSchema>;
export type WatchedMediaDTO = z.infer<typeof watchedMediaSchema>;
