import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import TaskService from "../../services/TaskService";
// eslint-disable-next-line import/no-duplicates
import type { EditTaskType, TaskDataType, TaskType} from "../../types/TaskTypes";
// eslint-disable-next-line import/no-duplicates
import { type ApiResponce } from "../../types/TaskTypes";
import { setToast } from "../toast/toastSlice";


// eslint-disable-next-line import/prefer-default-export
export const getTasksThunk = createAsyncThunk<ApiResponce>(
    "tasks/getAll",
    async () => {
        const data = await TaskService.getTasks();
        return data;
    });


export const createTaskThunk = createAsyncThunk<TaskType, TaskDataType>('tasks/create',
    async (data, thunkApi) => {
    const task = await TaskService.addTask(data);
    thunkApi.dispatch(setToast({title: 'Task created', status: 'success'}));
    return task;
    });
    

export const deleteTaskThunk = createAsyncThunk<TaskType['id'], TaskType['id']>('tasks/delete',
    async (id, thunkApi) => {
        await TaskService.deleteTask(id);
        thunkApi.dispatch(setToast({title: 'Task deleted', status: 'warning'}));
        return id;
});


export const editTaskThunk = createAsyncThunk<TaskType, EditTaskType>(
    'tasks/edit',
    async ({ id, data }) => {
      const task = await TaskService.editTask(id, data);
      return task;
    }
);  