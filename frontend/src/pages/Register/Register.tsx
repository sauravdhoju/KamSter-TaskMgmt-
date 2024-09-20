import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {
    Box,
    Heading,
    Text,
    Link as ChakraLink,
    Button,
    Image,
} from '@chakra-ui/react';

import { useBackendAPIContext } from '../../contexts/BackendAPIContext/BackendAPIContext';

import Icon from '../../components/Icon/Icon';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import NavBar from '../../components/NavBar/NavBar';
import FormBorder from '../../components/FormBorder/FormBorder';

import './Register.scss';

const Register = () => {
    const navigate = useNavigate();
    const { client } = useBackendAPIContext();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        setIsLoading(true);
        setIsLoading(true);
        const userDetails = {
            name,
            username,
            email,
            password,
        };
        client
            .post('/auth/register', userDetails)
            .then((res) => {
                console.log(res.data);
                setIsLoading(false);
                navigate('/login');
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleRegister();
    };
    return (
        <Box className='register-page'>
            <NavBar />
            <Box className='register-stuff-container'>
                <Heading className='greeting'>Create Account</Heading>
                <Text className='register-info-text'>
                    Create your new account!
                </Text>
                <form className='register-form' onSubmit={handleSubmit}>
                    <CustomTextInput
                        label='Full Name'
                        type='name'
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setName(e.target.value);
                        }}
                        placeholder='Full Name'
                        className='custom-input custom-input-username'
                    />
                    <CustomTextInput
                        label='Username'
                        type='text'
                        value={username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setUsername(e.target.value);
                        }}
                        placeholder='Username'
                        className='custom-input custom-input-username'
                        required
                    />
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
                        isLoading={isLoading}
                    >
                        Sign Up
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
                    to={'/login'}
                    className='login-page-link'
                    textAlign={'center'}
                    marginTop={'28px'}
                >
                    Have an account?{' '}
                    <Text as={'span'} fontWeight={700}>
                        Sign In!
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

export default Register;
