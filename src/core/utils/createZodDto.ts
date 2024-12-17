import type { z } from 'zod';

/**
 * Creates a class that can be used as a DTO with routing-controllers
 * while leveraging Zod's schema validation
 */
export function createZodDto<T extends z.ZodType>(schema: T) {
  abstract class ZodDto {
    constructor(data: z.infer<T>) {
      const result = schema.safeParse(data);
      if (!result.success) {
        throw result.error;
      }
      Object.assign(this, result.data);
    }

    static validate(data: unknown): z.infer<T> {
      const result = schema.safeParse(data);
      if (!result.success) {
        throw result.error;
      }
      return result.data;
    }
  }

  return ZodDto;
}
