import React, { useState } from 'react';
import {
    Box, Text, Flex, Spacer, IconButton, useClipboard, useToast,
    Tag, HStack, Button, useDisclosure
} from '@chakra-ui/react';
import { CopyIcon, DeleteIcon, InfoIcon } from '@chakra-ui/icons';
import { deleteUrl } from '../services/api';
import AnalyticsModal from './AnalyticsModal';

const UrlCard = ({ url, onUrlDeleted }) => {
    const shortUrl = `${window.location.origin}/${url.custom_alias || url.short_code}`;
    const { onCopy, hasCopied } = useClipboard(shortUrl);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteUrl(url._id);
            toast({
                title: 'URL Deleted',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            onUrlDeleted(url._id);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Could not delete URL.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            setIsDeleting(false);
        }
    };

    return (
        <>
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
                <Flex align="center">
                    <Box>
                        <Text fontWeight="bold" fontSize="lg">{shortUrl}</Text>
                        <Text fontSize="sm" color="gray.400" isTruncated maxW="400px">{url.original_url}</Text>
                    </Box>
                    <Spacer />
                    <HStack spacing={4}>
                        <Tag size="lg" colorScheme="green" borderRadius="full">
                            Clicks: {url.clicks}
                        </Tag>
                        <Button leftIcon={<InfoIcon />} onClick={onOpen} variant="ghost">Details</Button>
                        <IconButton
                            aria-label="Copy link"
                            icon={<CopyIcon />}
                            onClick={onCopy}
                            variant="ghost"
                        />
                        <IconButton
                            aria-label="Delete link"
                            icon={<DeleteIcon />}
                            colorScheme="red"
                            variant="ghost"
                            onClick={handleDelete}
                            isLoading={isDeleting}
                        />
                    </HStack>
                </Flex>
            </Box>
            <AnalyticsModal isOpen={isOpen} onClose={onClose} url={url} shortUrl={shortUrl} />
        </>
    );
};

export default UrlCard;
