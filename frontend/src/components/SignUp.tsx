import React, { SyntheticEvent, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import { useSignUpMutation } from '../api/authApi';
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

interface SignUpProps { }

function SignUp({ }: SignUpProps) {
    const [signUp, { data, isLoading, isError, error }] = useSignUpMutation();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const history = useHistory();

    const onClose = () => { 
        history.push('/');
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        signUp({
            username,
            email,
            password,
            confirmPassword,
        });
    };

    if (data) {
        return <Redirect to="/" />;
    }

    return (
            <Modal isOpen={true} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Sign Up</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing="3">
                            <FormControl>
                                <Input
                                    name="username"
                                    placeholder="Username"
                                    type="text"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                />
                            </FormControl>
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
                            <FormControl>
                                <Input
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    type="password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    value={confirmPassword}
                                />
                            </FormControl>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleSubmit} colorScheme="blue">Sign Up</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
    );
}

export default SignUp;
