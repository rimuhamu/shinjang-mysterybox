import { z } from 'zod';

export const GeneratorValidator = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  tickets: z.number().gt(0, { message: 'Ticket must be at least 1.' }),
});

export type TGeneratorValidator = z.infer<typeof GeneratorValidator>;
