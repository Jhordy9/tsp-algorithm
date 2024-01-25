import { useCallback, useState } from 'react';
import { Customer, List } from './List';
import useSWRMutation from 'swr/mutation';
import { fetcher, sendRequest } from '../utils';
import { Button, VStack, useToast } from '@chakra-ui/react';
import useSWR from 'swr';

export const RouteList: React.FC = () => {
  const [routes, setRoutes] = useState<Customer[]>([]);

  const urlCreate = 'http://localhost:4000/optimize-route';
  const { data, isLoading } = useSWR<Customer[]>(urlCreate, fetcher);
  const fireToast = useToast();

  const handleRoutes = useCallback(async () => {
    try {
      if (data) {
        setRoutes(data);
        fireToast({
          title: 'Rotas geradas com sucesso!',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
      fireToast({
        title: 'Erro ao gerar rotas',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [data, fireToast]);

  return (
    <VStack spacing={4} align='center' pt={4}>
      <Button onClick={handleRoutes} isLoading={isLoading}>
        Gerar rotas
      </Button>
      <List customers={routes} />
    </VStack>
  );
};
