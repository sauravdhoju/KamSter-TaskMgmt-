import { Link as ReactRouterLink } from 'react-router-dom';
import { Box, Link as ChakraLink, Button, Text } from '@chakra-ui/react';

import './MyAccount.scss';

const MyAccount = () => {
    return (
        <Box className='my-account-page'>
            <Text className='my-account-page-heading'>My Profile</Text>
        </Box>
    );
};

export default MyAccount;
