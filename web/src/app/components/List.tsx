import { VStack, Text } from '@chakra-ui/react';

export type Customer = {
  id: string;
  email: string;
  phone: string;
  name: string;
  xCoordinate: number;
  yCoordinate: number;
};

export const List: React.FC<{ customers: Customer[] }> = ({ customers }) => {
  return (
    <>
      {customers.map((c) => (
        <VStack
          alignItems='flex-start'
          key={c.id}
          borderWidth='1px'
          p={4}
          spacing={2}
          borderRadius='md'
          w='40%'
          maxW='100%'
          h='180px'
          maxH='100%'
        >
          <Text fontWeight='bold'>Nome: {c.name}</Text>
          <Text>Telefone: {c.phone}</Text>
          <Text>Email: {c.email}</Text>
          <Text>
            Coordenadas: ({c.xCoordinate}, {c.yCoordinate})
          </Text>
        </VStack>
      ))}
    </>
  );
};
