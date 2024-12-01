import { Box } from '@chakra-ui/react';
import PageContainer from '../../components/PageContainer/PageContainer';
import TasksList from '../../components/TasksList/TasksList';
import './Tasks.scss';

const Tasks = () => {
    return (
        <PageContainer>
            <Box
                className='tasks-list-container'
                width={'100%'}
                height={'100%'}
                paddingTop={'20px'}
            >
                <TasksList />
            </Box>
        </PageContainer>
    );
};

export default Tasks;
