import type { z } from 'zod';
import type { TaskSchema } from '../utils/validators';

export type TaskType = z.infer<typeof TaskSchema>;

// export type TaskDataType1 = Omit<TaskType, 'userId'>;

export type TaskDataType = Omit<TaskType, 'id' | 'userId'>;

export type ApiResponce = TaskType[];

export type EditTaskType = {
  id: number;
  data: TaskDataType;
};
