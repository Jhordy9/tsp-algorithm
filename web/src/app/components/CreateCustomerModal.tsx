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
  FormErrorMessage,
} from '@chakra-ui/react';
import useSWRMutation from 'swr/mutation';
import { sendRequest } from '../utils';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  phone: z.string().min(1, { message: 'Telefone é obrigatório' }),
  email: z
    .string()
    .email('Digite um e-mail válido')
    .min(1, { message: 'E-mail é obrigatório' }),
  xCoordinate: z.number().min(0, { message: 'X Coordenada é obrigatória' }),
  yCoordinate: z.number().min(0, { message: 'Y Coordenada é obrigatória' }),
});

type CreateCustomerFormData = z.infer<typeof schema>;

export const CreateCustomerModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    getValues,
  } = useForm<CreateCustomerFormData>({
    resolver: zodResolver(schema),
  });

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
              <FormControl mb={4} isInvalid={!!errors.name}>
                <FormLabel>Nome</FormLabel>
                <Input {...register('name')} />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl mb={4} isInvalid={!!errors.phone}>
                <FormLabel>Telefone</FormLabel>
                <InputGroup>
                  <Input
                    {...register('phone')}
                    onChange={(e) => {
                      setValue('phone', e.target.value.replace(/\D/g, ''));
                    }}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
              </FormControl>
              <FormControl mb={4} isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input type='email' {...register('email')} />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl mb={4} isInvalid={!!errors.xCoordinate}>
                <FormLabel>X Coordenada</FormLabel>
                <Input type='number' {...register('xCoordinate')} />
                <FormErrorMessage>
                  {getValues()?.xCoordinate?.toString().length > 0
                    ? errors.xCoordinate?.message
                    : 'Digite um valor válido'}
                </FormErrorMessage>
              </FormControl>
              <FormControl mb={4} isInvalid={!!errors.yCoordinate}>
                <FormLabel>Y Coordenada</FormLabel>
                <Input type='number' {...register('yCoordinate')} />
                <FormErrorMessage>
                  {getValues()?.yCoordinate?.toString().length > 0
                    ? errors.yCoordinate?.message
                    : 'Digite um valor válido'}
                </FormErrorMessage>
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
