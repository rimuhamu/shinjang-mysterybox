import { z } from 'zod';

export const TokenValidator = z.object({
  token: z.string().uuid({ message: 'Please enter a valid token.' }),
});

export type TTokenValidator = z.infer<typeof TokenValidator>;
