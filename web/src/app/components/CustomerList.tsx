'use client';
import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { Input, VStack, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import { useDebounce } from '../hooks/useDebounce';
import { fetcher } from '../utils';
import { CreateCustomerModal } from './CreateCustomerModal';
import { Customer, List } from './List';

export const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [keywordFilter, setFilters] = useState<string>('');
  const debouncedValue = useDebounce<string>(keywordFilter, 1000);
  const urlGetCustomers = `http://localhost:4000/customers?search=${debouncedValue}`;

  const { data: resultData, mutate } = useSWR<Customer[]>(
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
    <VStack spacing={4} align='center' pt={4}>
      <Input
        placeholder='Procure por nome, email ou telefone'
        value={keywordFilter}
        onChange={handleFilterByKeyWord}
        maxW='30%'
        w='30%'
      />
      <CreateCustomerModal />
      <List customers={customers} />
    </VStack>
  );
};
