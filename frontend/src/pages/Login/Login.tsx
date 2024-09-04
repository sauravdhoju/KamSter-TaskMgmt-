import { Link as ReactRouterLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Link as ChakraLink } from '@chakra-ui/react';
import Icon from '../../components/Icon/Icon';

import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';

import NavBar from '../../components/NavBar/NavBar';
import './Login.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        console.log(email);
    }, [email]);
    return (
        <Box className='login-page'>
            <NavBar />
            <Box className='login-stuff-container'>
                <Icon name='bx-search' className='hello' />
                <Heading className='greeting'>Welcome Back</Heading>
                <Text className='login-info-text'>Login to your account</Text>
                <form className='login-form'>
                    <CustomTextInput
                        label='Email'
                        type='email'
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(e.target.value);
                        }}
                        placeholder='example@email.com'
                        required
                    />
                    <CustomTextInput
                        label='Password'
                        type='password'
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(e.target.value);
                        }}
                        required
                    />
                </form>
                <ChakraLink
                    as={ReactRouterLink}
                    to='/'
                    className='forgot-password-link'
                >
                    Forgot Password?
                </ChakraLink>
                <ChakraLink
                    as={ReactRouterLink}
                    to={'/'}
                    className='back-home-link'
                >
                    Back to Home
                </ChakraLink>
            </Box>
        </Box>
    );
};

export default Login;
