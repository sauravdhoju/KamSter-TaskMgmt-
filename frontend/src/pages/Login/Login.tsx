import { Box, Heading } from '@chakra-ui/react';

import './Login.scss';

const Login = () => {
    const greeting = 'morning';

    const getGreeting = () => {
        if (greeting === 'morning') {
            return 'Good Morning!';
        } else if (greeting === 'afternoon') {
            return 'Good Afternoon!';
        } else if (greeting === 'evening') {
            return 'Good Night!';
        }
    };
    return (
        <Box className='login-page'>
            <Heading className='greeting'>{getGreeting()}</Heading>
        </Box>
    );
};

export default Login;
