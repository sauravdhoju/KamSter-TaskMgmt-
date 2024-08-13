import axios from 'axios';
import { Box, Button, Heading } from '@chakra-ui/react';

import './Home.scss';
import { useEffect, useState } from 'react';

const baseUrl = 'http://localhost:8080';

const Home = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios
            .get(`${baseUrl}/whatistoday`, { withCredentials: true })
            .then((res) => {
                setMessage(res.data.message);
                console.log(res);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <Box>
            <Button variant={'link'}>click me</Button>
            <Heading>{message === '' ? 'Empty message!' : message}</Heading>
        </Box>
    );
};

export default Home;
