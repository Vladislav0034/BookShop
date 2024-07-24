import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import TaskService from "../../services/TaskService";
// eslint-disable-next-line import/no-duplicates
import type { EditTaskType, TaskDataType, TaskType} from "../../types/TaskTypes";
// eslint-disable-next-line import/no-duplicates
import { type ApiResponce } from "../../types/TaskTypes";


// eslint-disable-next-line import/prefer-default-export
export const getTasksThunk = createAsyncThunk<ApiResponce>(
    "tasks/getAll",
    async () => {
        const data = await TaskService.getTasks();
        return data;
    });


export const createTaskThunk = createAsyncThunk<TaskType, TaskDataType>('tasks/create',
    async (data) => {
    const task = await TaskService.addTask(data);
    return task;
    });
    

export const deleteTaskThunk = createAsyncThunk<TaskType['id'], TaskType['id']>('tasks/delete',
    async (id) => {
        await TaskService.deleteTask(id);
        return id;
});


export const editTaskThunk = createAsyncThunk<TaskType, EditTaskType>(
    'tasks/edit',
    async ({ id, data }) => {
      const task = await TaskService.editTask(id, data);
      return task;
    }
);  