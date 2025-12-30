import {z} from 'zod';
import {signInSchema, signUpSchema} from '../schemas/auth';

export type SignUpDTO = z.infer<typeof signUpSchema>;

export type SignInDTO = z.infer<typeof signInSchema>;
