import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import TaskCard from '../ui/TaskCard';
import TaskForm from '../ui/TaskForm';
import useTasks from '../../hooks/useTasks';
import TostPart from '../ui/TostPart';
import { useAppSelector } from '../../hooks/reduxHooks';

export default function FilterPage(): JSX.Element {
  const { TasksSubmitHandler, tasks, deleteHandler, editHandler } = useTasks();
  const currentUser = useAppSelector((state) => state.auth.user);

  // Фильтрация задач для отображения только тех, которые принадлежат текущему пользователю
  const userTasks = tasks.filter(task => task.userId === currentUser.id);

  return (
    <>
      <TaskForm TasksSubmitHandler={TasksSubmitHandler} />
      <SimpleGrid columns={3} spacing={5}>
        {userTasks.map((el) => (
          <TaskCard
            task={el}
            key={el.id}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
          />
        ))}
      </SimpleGrid>
      <TostPart />
    </>
  );
}
