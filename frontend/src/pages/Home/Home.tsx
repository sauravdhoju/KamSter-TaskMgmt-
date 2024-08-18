import axios from 'axios';
import { Box, Button, Heading } from '@chakra-ui/react';
import './Home.scss';
import { useEffect, useState } from 'react';

const baseUrl = 'http://localhost:8080';

const Home: React.FC = () => {
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        axios
            .get<{ message: string }>(`${baseUrl}/whatistoday`, { withCredentials: true })
            .then((res) => {
                setMessage(res.data.message);
                console.log(res);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <Box>
            <Box className="upper-part">
                <Heading mt={4}>{message === '' ? 'Hello,!' : message}</Heading>
                <Heading mt={4}>{message === '' ? 'Good morning!' : message}</Heading>
                <Box className="task-summary">
                    <a href="#!">10 tasks completed,5 pending</a>
                    </Box>
                    </Box>
                <input className="search-input" type="text" placeholder="Search for anything..." />
                
                    
                
            
        </Box>
    );
};

export default Home;
