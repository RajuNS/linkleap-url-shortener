import React, { useState, useContext } from 'react';
import {
    Box, Button, Container, FormControl, FormLabel, Input,
    Heading, VStack, useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { login as loginUser } from '../services/api';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await loginUser({ email, password });
            login(res.data, res.data.token);
            toast({
                title: 'Logged in successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            navigate('/dashboard');
        } catch (error) {
            toast({
                title: 'Login failed.',
                description: error.response?.data?.message || 'An error occurred.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container centerContent>
            <Box w="100%" maxW="md" p={8} mt={10} borderWidth={1} borderRadius="lg" boxShadow="lg">
                <VStack spacing={4}>
                    <Heading>Login</Heading>
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </FormControl>
                            <Button type="submit" colorScheme="teal" w="100%" isLoading={isLoading}>
                                Login
                            </Button>
                        </VStack>
                    </form>
                </VStack>
            </Box>
        </Container>
    );
};

export default LoginPage;
