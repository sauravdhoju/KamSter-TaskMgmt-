import axios from 'axios';
import { Box, Heading } from '@chakra-ui/react';

import './Home.scss';
import { useEffect, useState } from 'react';

import NavBar from '../../components/NavBar/NavBar';
import Sidebar from '../../components/Sidebar/Sidebar';

const baseUrl = 'http://localhost:5000';

const Home = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios
            .get(`${baseUrl}/`, { withCredentials: true })
            .then((res) => {
                setMessage(res.data.name);
                console.log(res);
            })
            .catch((err) => console.log(err));
    }, []);

    const [isSideBarOpen, setIsSidebarOpen] = useState(false);

    return (
        <Box className='home-page'>
            <NavBar
                isSideBarOpen={isSideBarOpen}
                setIsSideBarOpen={setIsSidebarOpen}
            />
            <Sidebar
                isSideBarOpen={isSideBarOpen}
                setIsSideBarOpen={setIsSidebarOpen}
            />
            {/* <Button variant={'link'}>click me</Button> */}
            <Heading>{message === '' ? 'Empty message!' : message}</Heading>
        </Box>
    );
};

export default Home;
