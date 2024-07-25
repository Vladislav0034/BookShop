import {  z } from 'zod';

export const TaskSchema = z.object({
    id: z.number(),
    name: z.string(),
    userId: z.number().nullable().optional(),
    description: z.string(),
    deadlines: z.string(),
    image: z.string(),
    status: z.string(),
  });

  export const TasksSchema = z.array(TaskSchema);
