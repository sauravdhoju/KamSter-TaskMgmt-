import { Link as ReactRouterLink } from 'react-router-dom';
import React, { useState } from 'react';
import {
    Box,
    Heading,
    Text,
    Link as ChakraLink,
    Button,
    Image,
} from '@chakra-ui/react';

import Icon from '../../components/Icon/Icon';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import NavBar from '../../components/NavBar/NavBar';
import FormBorder from '../../components/FormBorder/FormBorder';
import './Login.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <Box className='login-page'>
            <NavBar />
            <Box className='login-stuff-container'>
                <Heading className='greeting'>Welcome Back</Heading>
                <Text className='login-info-text'>Login to your account</Text>
                <form className='login-form' onSubmit={handleSubmit}>
                    <CustomTextInput
                        label='Email'
                        type='email'
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(e.target.value);
                        }}
                        placeholder='example@email.com'
                        className='custom-input custom-input-email'
                        required
                    />
                    <CustomTextInput
                        label='Password'
                        type='password'
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(e.target.value);
                        }}
                        className='custom-input custom-input-password'
                        placeholder='********'
                        required
                    />
                    <ChakraLink
                        as={ReactRouterLink}
                        to='/'
                        className='forgot-password-link'
                    >
                        Forgot Password?
                    </ChakraLink>
                    <Button
                        type='submit'
                        className='form-submit-btn'
                        background={'#000000'}
                        color={'#d9d9d9'}
                        borderRadius={'8px'}
                        marginTop={'15px'}
                        height={'50px'}
                        fontSize={'22px'}
                        fontWeight={600}
                    >
                        Sign In
                    </Button>
                </form>
                <FormBorder />
                <Text className='or-continue-with'>Or continue with</Text>
                <Button className='google-sign-in-btn'>
                    <Text as={'span'} className='google-logo-container'>
                        <Image src='/googlelogo.png' className='google-logo' />
                    </Text>
                    Sign in with Google
                </Button>
                <ChakraLink
                    as={ReactRouterLink}
                    to={'/register'}
                    className='register-page-link'
                    textAlign={'center'}
                    marginTop={'28px'}
                >
                    Don't have an account?{' '}
                    <Text as={'span'} fontWeight={700}>
                        Sign Up!
                    </Text>
                </ChakraLink>
                <ChakraLink
                    as={ReactRouterLink}
                    to={'/'}
                    className='back-home-link'
                >
                    <Icon name='bx-arrow-back' className='arrow' />
                    Back to Home
                </ChakraLink>
            </Box>
        </Box>
    );
};

export default Login;
