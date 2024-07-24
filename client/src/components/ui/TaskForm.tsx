import React from 'react'
import { Box, Button, Input, Stack } from '@chakra-ui/react';
import TaskService from '../../services/TaskService';
import type { TaskDataType } from '../../types/TaskTypes';


type PropsType = {
  TasksSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function TaskForm({TasksSubmitHandler}: PropsType): JSX.Element {

  return (
    <Box onSubmit={TasksSubmitHandler} as="form" mt={3}>
      <Stack spacing={3}>
        <Input name="name" placeholder="name" size="md" />
        <Input name="description" placeholder="description" size="md" />
        <Input name="deadlines" placeholder="deadlines" size="md" />
        <Input name="image" placeholder="image" size="md" />
        <Input name="status" placeholder="status" size="md" />
        <Button type="submit" colorScheme="green">
          Добавить Задачу
        </Button>
      </Stack>
    </Box>
  )
}
