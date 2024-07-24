import { createSlice } from '@reduxjs/toolkit';
import type { TaskType } from '../../types/TaskTypes';
import { createTaskThunk, deleteTaskThunk, editTaskThunk, getTasksThunk } from './TaskAsyncActions';

type InitialStateType = {
  data: TaskType[];
};

const initialState: InitialStateType = {
  data: [],
};

const TasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasksThunk.fulfilled, (state, { payload }) => {
      state.data = payload;
    });

    builder.addCase(createTaskThunk.fulfilled, (state, { payload }) => {
      state.data.push(payload);
    });

    builder.addCase(deleteTaskThunk.fulfilled, (state, { payload }) => {
      state.data = state.data.filter((el) => el.id !== payload);
    });
    builder.addCase(editTaskThunk.fulfilled, (state, { payload }) => {
      state.data = state.data.map((el) => {
        if (el.id === payload.id) {
          return payload;
        }
        return el;
      });
    });
  },
});

export default TasksSlice;
