import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import { useUserContext } from './contexts/UserContext/UserContext';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import MyAccount from './pages/MyAccount/MyAccount';


// import Sidebar from './pages/Sidebar/Sidebar';
// import Calender from './pages/Calender/Calender';
// import Kanban from './pages/Kanban/Kanban';

import './App.scss';

const App = () => {

    // return ( 
    //     <Box className='app'>
    //         <NavBar />

    //         <Flex>
    //         {/*Sidebar here */}
    //         <Sidebar />

    //         <Box flex="1">
    //         <Routes>
    //             <Route path='/' element={<Home />} />
    //             <Route path='/auth/login' element={<Login />} />
            
    //             {/* <Route path="/calendar" element={<Calender />} />
    //             <Route path="/kanban" element={<Kanban />} /> */}
     

    // try to fetch user on site load
    const { fetchUser } = useUserContext();
    useEffect(() => {
        fetchUser();
    }, []);

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
