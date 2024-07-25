import React, { useState } from 'react';
import { Box, Button, Input, Stack } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import type { TaskDataType } from '../../types/TaskTypes';

type PropsType = {
  TasksSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function TaskForm({ TasksSubmitHandler }: PropsType): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);


  const wrappedTasksSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    TasksSubmitHandler(e);
    closeModal();
  }

  return (
    <>
      <Button onClick={openModal} colorScheme="purple" mt={8} mb={8}>Добавить Задачу</Button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить новую задачу</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box onSubmit={wrappedTasksSubmitHandler} as="form" mt={3}>
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
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Закрыть
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}