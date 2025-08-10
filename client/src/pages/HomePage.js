import React, { useState, useContext } from 'react';
import {
    Box, Container, Heading, Input, Button, Text, useToast,
    InputGroup, InputRightAddon, VStack, Link, HStack, useClipboard
} from '@chakra-ui/react';
import { createShortUrl } from '../services/api';
import AuthContext from '../context/AuthContext';

const HomePage = () => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const toast = useToast();
    const { onCopy, hasCopied } = useClipboard(shortUrl);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!originalUrl) return;
        setIsLoading(true);

        try {
            const res = await createShortUrl({ originalUrl });
            
            // --- THIS IS THE NEW DEBUGGING LINE ---
            console.log('API Response:', res.data); 

            const fullShortUrl = `${window.location.origin}/${res.data.short_code}`;
            setShortUrl(fullShortUrl);
        } catch (error) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'Could not shorten URL.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxW="container.md" centerContent py={20}>
            <VStack spacing={6} textAlign="center">
                <Heading as="h1" size="2xl">Create Short & Memorable Links</Heading>
                <Text fontSize="lg" color="gray.400">
                    The ultimate tool to shorten URLs. {user ? `Welcome back, ${user.name}!` : 'Login to manage your links.'}
                </Text>
                <Box as="form" onSubmit={handleSubmit} w="100%">
                    <InputGroup size="lg">
                        <Input
                            placeholder="Enter your long URL here"
                            value={originalUrl}
                            onChange={(e) => setOriginalUrl(e.target.value)}
                            type="url"
                            required
                        />
                        <InputRightAddon p={0}>
                            <Button type="submit" size="lg" colorScheme="teal" isLoading={isLoading} borderLeftRadius={0}>
                                Shorten
                            </Button>
                        </InputRightAddon>
                    </InputGroup>
                </Box>
                {shortUrl && (
                    <VStack bg="gray.700" p={4} borderRadius="md" w="100%">
                        <Text>Your shortened link:</Text>
                        <HStack>
                            <Link href={shortUrl} isExternal color="teal.300" fontWeight="bold">{shortUrl}</Link>
                            <Button onClick={onCopy} size="sm">{hasCopied ? 'Copied!' : 'Copy'}</Button>
                        </HStack>
                    </VStack>
                )}
            </VStack>
        </Container>
    );
};

export default HomePage;