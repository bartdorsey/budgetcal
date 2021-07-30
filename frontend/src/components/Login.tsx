import React, { useState, SyntheticEvent } from 'react';
import { useLoginMutation } from '../api/authApi';
import { useHistory } from 'react-router-dom';
import { setUser } from '../slices/authSlice';
import { useDispatch } from 'react-redux';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  Stack,
} from '@chakra-ui/react';

interface LoginProps {}

function Login({}: LoginProps) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [login, { isError, error }] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onClose = () => {
    history.push('/');
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    const user = await login({
      email,
      password,
    }).unwrap();
    console.log(user);
    dispatch(setUser(user));
    history.push('/');
  };

  return (
      <Modal isOpen={true} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="3">
              <div className="error">{isError ? error : null}</div>
              <FormControl>
                <Input
                  name="email"
                  placeholder="Email Address"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </FormControl>
              <FormControl>
                <Input
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue">Login</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  );
}

export default Login;
