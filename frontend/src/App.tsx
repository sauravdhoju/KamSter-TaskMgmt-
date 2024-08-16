import { Route, Routes } from 'react-router-dom';

import { Box, Heading, Flex } from '@chakra-ui/react';
import 'boxicons/css/boxicons.min.css';

import NavBar from './components/NavBar/NavBar';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

import Sidebar from './pages/Sidebar/Sidebar';
// import Calender from './pages/Calender/Calender';
// import Kanban from './pages/Kanban/Kanban';

import './App.scss';

const App = () => {
    return ( 
        <Box className='app'>
            <NavBar />

            <Flex>
            {/*Sidebar here */}
            <Sidebar />

            <Box flex="1">
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/auth/login' element={<Login />} />
            
                {/* <Route path="/calendar" element={<Calender />} />
                <Route path="/kanban" element={<Kanban />} /> */}
     
            </Routes>
            </Box>
            </Flex>
        </Box>
    
    );
};



export default App;


