'use client';
import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { Input, VStack, Text } from '@chakra-ui/react';
import { Header } from './components/Header';
import { useDebounce } from './hooks/useDebounce';
import useSWR from 'swr';
import { fetcher } from './utils';

type ApiResponse = {
  id: string;
  email: string;
  phone: string;
  name: string;
  xCoordinate: number;
  yCoordinate: number;
};

type FiltersType = {
  name: string;
  email: string;
  phone: string;
};

const ResultsList: React.FC = () => {
  const [customers, setCustomers] = useState<ApiResponse[]>([]);

  const [keywordFilter, setFilters] = useState<string>('');
  const debouncedValue = useDebounce<string>(keywordFilter, 1000);
  const urlGetCustomers = `http://localhost:4000/customers?search=${debouncedValue}`;

  const { data: resultData, mutate } = useSWR<ApiResponse[]>(
    urlGetCustomers,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  useEffect(() => {
    if (resultData) {
      setCustomers(resultData);
    }
  }, [resultData]);

  const handleFilterByKeyWord = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFilters(e.currentTarget.value);
      mutate();
    },
    [mutate]
  );

  return (
    <>
      <Header />
      <VStack spacing={4} align='center' pt={4}>
        <Input
          placeholder='Procure por nome, email ou telefone'
          value={keywordFilter}
          onChange={handleFilterByKeyWord}
          maxW='30%'
          w='30%'
        />
        {customers.map((result, index) => (
          <VStack
            alignItems='flex-start'
            key={index}
            borderWidth='1px'
            p={4}
            spacing={2}
            borderRadius='md'
            w='40%'
            maxW='100%'
            h='180px'
            maxH='100%'
          >
            <Text fontWeight='bold'>Nome: {result.name}</Text>
            <Text>Telefone: {result.phone}</Text>
            <Text>Email: {result.email}</Text>
            <Text>
              Coordenadas: ({result.xCoordinate}, {result.yCoordinate})
            </Text>
          </VStack>
        ))}
      </VStack>
    </>
  );
};

export default ResultsList;
