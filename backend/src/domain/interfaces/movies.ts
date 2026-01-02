import {searchMoviesSchema} from '../schemas/movies';
import {z} from 'zod';

export type SearchMoviesDTO = z.infer<typeof searchMoviesSchema>;
