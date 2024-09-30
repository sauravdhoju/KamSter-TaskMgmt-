import axios from 'axios';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
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
                    <a href="#!">10 tasks completed, 5 pending</a>
                </Box>
            </Box>
            <input className="search-input" type="text" placeholder="Search for anything..." />
            
            <Box className="button-section">
                <Button className="my-list-button" onClick={() => console.log('My List clicked')}>
                    <i className="fa-solid fa-star"></i> My List
                </Button>
                <Button className="new-list-button" onClick={() => console.log('New List clicked')}>
                    <i className="fa-solid fa-plus"></i> New List
                </Button>
            </Box>
            <hr className="divider" />
            <Text className="hire-me-text">
                <i className="circle-sign">o</i> Hire Me for Designer <i className="fa-solid fa-star"></i>
            </Text>
            
            {/* Positioned at the bottom-right corner */}
            <Button 
                className="plus-button" 
                onClick={() => console.log('Add New List')} 
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    background: 'none', // Remove background
                    border: 'none',     // Remove border
                    padding: 0,        // Remove padding
                    cursor: 'pointer'   // Change cursor to pointer
                }}
            >
                <i className="fa-solid fa-circle-plus fa-2x"></i> 
            </Button>
        </Box>
    );
};

export default Home;
