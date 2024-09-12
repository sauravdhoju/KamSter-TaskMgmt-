import { Route, Routes } from 'react-router-dom';

import { Box } from '@chakra-ui/react';
import 'boxicons/css/boxicons.min.css';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

// import Calender from './pages/Calender/Calender';
// import Kanban from './pages/Kanban/Kanban';

import './App.scss';

const App = () => {
    return (
        <Box className='app'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/auth/login' element={<Login />} />

                {/* <Route path="/calendar" element={<Calender />} />
                <Route path="/kanban" element={<Kanban />} /> */}
            </Routes>
        </Box>
    );
};

export default App;
