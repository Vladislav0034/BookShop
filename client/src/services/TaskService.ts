import type { AxiosInstance} from "axios";
import apiInstance from "./apiInstance";
import { TaskSchema, TasksSchema } from "../utils/validators";
import type { ApiResponce, TaskType, TaskDataType } from "../types/TaskTypes";


class TaskService {
    constructor( private readonly api: AxiosInstance) {}

    async getTasks(): Promise<ApiResponce> {
        const {data} = await this.api.get<ApiResponce>('/api');
        return TasksSchema.parse(data);
    }

    async addTask(obj: TaskDataType): Promise<TaskType> {
        const {data} = await this.api.post<TaskType>('/api', obj);
        return TaskSchema.parse(data);
    }

    async deleteTask(id: number): Promise<ApiResponce> {
        return this.api.delete(`/api/${id}`);
}

async editTask(id: number, obj: TaskDataType): Promise<TaskType> {
    const { data } = await this.api.patch<TaskType>(`/api/${id}`, obj);
    return TaskSchema.parse(data);
  }
}

export default new TaskService(apiInstance);