import React from 'react';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
    ModalBody, ModalCloseButton, Button, VStack, Text, Center, Box,
    Table, Thead, Tbody, Tr, Th, Td, TableContainer
} from '@chakra-ui/react';
import QRCode from 'qrcode.react';

const AnalyticsModal = ({ isOpen, onClose, url, shortUrl }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Link Details & Analytics</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={6} align="stretch">
                        <Center>
                            <Box p={4} bg="white" borderRadius="md">
                                <QRCode value={shortUrl} size={128} />
                            </Box>
                        </Center>
                        <Text><b>Short URL:</b> {shortUrl}</Text>
                        <Text><b>Original URL:</b> {url.original_url}</Text>
                        <Text><b>Total Clicks:</b> {url.clicks}</Text>
                        
                        <Text fontWeight="bold" mt={4}>Click History:</Text>
                        {url.click_details.length > 0 ? (
                            <TableContainer>
                                <Table variant="simple">
                                    <Thead>
                                        <Tr>
                                            <Th>Timestamp</Th>
                                            <Th>Browser/Device</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {url.click_details.map((click, index) => (
                                            <Tr key={index}>
                                                <Td>{new Date(click.timestamp).toLocaleString()}</Td>
                                                <Td isTruncated maxW="300px">{click.userAgent}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <Text>No clicks recorded yet.</Text>
                        )}
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AnalyticsModal;
