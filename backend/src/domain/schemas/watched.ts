import {z} from 'zod';

export const mediaTypeSchema = z.enum(['tv', 'movie']);

// TODO erase or in schema
export const watchedMediaSchema = z.object({
  media_id: z
    .number()
    .or(z.string())
    .transform((value) => Number(value)),
  media_type: mediaTypeSchema,
});

export const watchedQuerySchema = z.object({
  media_type: mediaTypeSchema,
});
