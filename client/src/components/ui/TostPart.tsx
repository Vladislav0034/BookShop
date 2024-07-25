import { useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';


export default function TostPart(): null {
  const toast = useToast();
  const data = useAppSelector((state) => state.toast.data);

  useEffect(() => {
    if (data) {
      toast({
        title: data.title,
        position: 'bottom',
        status: data.status,
        isClosable: true,
      });
    }
  }, [data]);

  return null;
}
