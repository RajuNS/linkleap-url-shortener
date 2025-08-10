import React, { useState, useEffect, useContext } from 'react';
import { Container, Heading, VStack, Spinner, Center, Text } from '@chakra-ui/react';
import { getUrlsForUser } from '../services/api';
import AuthContext from '../context/AuthContext';
import UrlCard from '../components/UrlCard';

const DashboardPage = () => {
    const [urls, setUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchUrls = async () => {
            try {
                const res = await getUrlsForUser();
                setUrls(res.data);
            } catch (error) {
                console.error("Failed to fetch URLs", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUrls();
    }, []);

    const handleUrlDeleted = (deletedUrlId) => {
        setUrls(urls.filter(url => url._id !== deletedUrlId));
    };

    if (isLoading) {
        return <Center h="80vh"><Spinner size="xl" /></Center>;
    }

    return (
        <Container maxW="container.lg" py={10}>
            <VStack spacing={8} align="stretch">
                <Heading>Welcome, {user?.name}</Heading>
                {urls.length > 0 ? (
                    urls.map(url => (
                        <UrlCard key={url._id} url={url} onUrlDeleted={handleUrlDeleted} />
                    ))
                ) : (
                    <Text>You haven't created any links yet. Go ahead and shorten one!</Text>
                )}
            </VStack>
        </Container>
    );
};

export default DashboardPage;
