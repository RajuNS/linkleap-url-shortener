import React, { useContext } from 'react';
import { Box, Flex, Button, Heading, Spacer, useColorMode, IconButton } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const { colorMode, toggleColorMode } = useColorMode();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Flex as="nav" p="4" borderBottom="1px" borderColor="gray.700" align="center">
            <Heading as={RouterLink} to="/" size="md">LinkLeap</Heading>
            <Spacer />
            <Box>
                {user ? (
                    <>
                        <Button as={RouterLink} to="/dashboard" mr="4" variant="ghost">Dashboard</Button>
                        <Button onClick={handleLogout} colorScheme="red">Logout</Button>
                    </>
                ) : (
                    <>
                        <Button as={RouterLink} to="/login" mr="4" variant="ghost">Login</Button>
                        <Button as={RouterLink} to="/register" colorScheme="teal">Sign Up</Button>
                    </>
                )}
            </Box>
            <IconButton
                ml="4"
                onClick={toggleColorMode}
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                aria-label="Toggle Color Mode"
            />
        </Flex>
    );
};

export default Navbar;
