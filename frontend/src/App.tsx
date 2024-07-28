import { Route, Routes } from 'react-router-dom';

import { Box, Heading } from '@chakra-ui/react';

import NavBar from './components/NavBar/NavBar';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

import './App.scss';

const App = () => {
    return (
        <Box className='app'>
            <NavBar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/auth/login' element={<Login />} />
            </Routes>
        </Box>
    );
};

export default App;
