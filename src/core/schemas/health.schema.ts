import { z } from 'zod';
import { createZodDto } from '../utils/createZodDto';

// Define the Health schema using Zod
export const HealthSchema = z.object({
  status: z.string(),
  timestamp: z.string().datetime(),
  version: z.string().optional(),
  uptime: z.number().optional(),
  memory: z
    .object({
      used: z.number(),
      total: z.number(),
    })
    .optional(),
});

// Create a type from the schema
export type Health = z.infer<typeof HealthSchema>;

// Create a DTO class that can be used with routing-controllers
export class HealthDto extends createZodDto(HealthSchema) {}
