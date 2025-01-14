import { useNavigate, useParams } from 'react-router-dom';
import { Box, Text, Button } from '@chakra-ui/react';

import { useBackendAPIContext } from '../../contexts/BackendAPIContext/BackendAPIContext';

const MarkTaskComplete = () => {
    const navigate = useNavigate();
    const { taskId } = useParams();

    const { client } = useBackendAPIContext();

    client
        .patch(`/task/update/${taskId}`, { is_completed: true })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));

    return (
        <Box>
            <Text>Task Marked Completed!</Text>
            <Button onClick={() => navigate('/')}>Go Back Home</Button>
        </Box>
    );
};

export default MarkTaskComplete;
