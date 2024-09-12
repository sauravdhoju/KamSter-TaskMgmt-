import { Route, Routes } from 'react-router-dom';

import { Box } from '@chakra-ui/react';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import MyAccount from './pages/MyAccount/MyAccount';

// import Calender from './pages/Calender/Calender';
// import Kanban from './pages/Kanban/Kanban';

import './App.scss';

const App = () => {
    return (
        <Box className='app'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/my-account' element={<MyAccount />} />
            </Routes>
        </Box>
    );
};

export default App;
