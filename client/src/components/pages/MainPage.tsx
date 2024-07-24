import React, { useContext } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import TaskCard from '../ui/TaskCard';
import TaskForm from '../ui/TaskForm';
import useTasks from '../../hooks/useTasks';



export default function MainPage():JSX.Element {
  const { TasksSubmitHandler, tasks, deleteHandler, editHandler } = useTasks();

  return (
    <>
    <TaskForm TasksSubmitHandler={TasksSubmitHandler}/>
    <SimpleGrid columns={3} spacing={5}>
      {tasks.map((el) => (<TaskCard task={el} key={el.id} deleteHandler={deleteHandler}
      editHandler={editHandler}/>))}
    </SimpleGrid>
    </>
  )
}
