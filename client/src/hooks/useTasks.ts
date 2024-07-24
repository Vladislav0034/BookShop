import type React from 'react';
import { useEffect } from 'react';
import { createTaskThunk, deleteTaskThunk, editTaskThunk, getTasksThunk } from '../redux/Tasks/TaskAsyncActions';
import type { EditTaskType, TaskType } from '../types/TaskTypes';
import { useAppDispatch, useAppSelector } from './reduxHooks';

export default function useTasks(): {
  tasks: TaskType[];
  TasksSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  deleteHandler: (id: TaskType['id']) => void
  editHandler: ( obj: EditTaskType) => void
} {
  const tasks = useAppSelector((state) => state.tasks.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getTasksThunk());
  }, [dispatch]);

  const TasksSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as unknown as TaskType;
    void dispatch(createTaskThunk(data));
  };

  const deleteHandler = (id: TaskType['id']): void => {
    void dispatch(deleteTaskThunk(id));
  }

  const editHandler = ( obj: EditTaskType): void => {
    void dispatch(editTaskThunk(obj));
  }

  return { tasks, TasksSubmitHandler, deleteHandler, editHandler };
}