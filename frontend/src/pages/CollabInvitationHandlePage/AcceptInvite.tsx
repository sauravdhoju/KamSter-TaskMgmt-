import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Text, Button } from '@chakra-ui/react';

import { useBackendAPIContext } from '../../contexts/BackendAPIContext/BackendAPIContext';

const AcceptInvite = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const token = searchParams.get('token');
    const { client } = useBackendAPIContext();

    client
        .patch(`/project-collaboration/invite?token=${token}`, {
            action: 'accept',
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => console.log(err));

    return (
        <Box>
            <Text>Collaboration Invitation Accepted!</Text>
            <Button onClick={() => navigate('/')}>Go Back Home</Button>
        </Box>
    );
};

export default AcceptInvite;
