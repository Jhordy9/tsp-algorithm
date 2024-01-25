import { useForm } from 'react-hook-form';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import useSWRMutation from 'swr/mutation';
import { sendRequest } from '../utils';

type CreateCustomerFormData = {
  name: string;
  phone: string;
  email: string;
  xCoordinate: number;
  yCoordinate: number;
};

export const CreateCustomerModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, setValue, reset } =
    useForm<CreateCustomerFormData>();

  const fireToast = useToast();

  const urlCreate = 'http://localhost:4000/customers';

  const { trigger, isMutating } = useSWRMutation(urlCreate, sendRequest);

  const onSubmit = (data: CreateCustomerFormData) => {
    try {
      const { xCoordinate, yCoordinate, ...restData } = data;
      trigger({
        ...restData,
        xCoordinate: Number(xCoordinate),
        yCoordinate: Number(yCoordinate),
      });
      onClose();
      reset();

      fireToast({
        title: 'Cliente criado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      fireToast({
        title: 'Erro ao criar cliente',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      onClose();
      reset();
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Create Customer</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicione um cliente</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Nome</FormLabel>
                <Input {...register('name')} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Telefone</FormLabel>
                <InputGroup>
                  <Input
                    {...register('phone')}
                    onChange={(e) => {
                      setValue('phone', e.target.value.replace(/\D/g, ''));
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Email</FormLabel>
                <Input type='email' {...register('email')} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>X Coordenada</FormLabel>
                <Input type='number' {...register('xCoordinate')} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Y Coordenada</FormLabel>
                <Input type='number' {...register('yCoordinate')} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type='submit' isLoading={isMutating}>
                Adicionar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
