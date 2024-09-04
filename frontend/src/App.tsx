import { Route, Routes } from 'react-router-dom';

import { Box, Heading } from '@chakra-ui/react';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import MyAccount from './pages/MyAccount/MyAccount';

import './App.scss';

const App = () => {
    return (
        <Box className='app'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/my-account' element={<MyAccount />} />
            </Routes>
        </Box>
    );
};

export default App;
