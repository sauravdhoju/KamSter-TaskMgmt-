import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';

import { Task } from '../../contexts/TaskContext/TaskContext';

type TaskBlockType = {
    dayTask: Task;
};

const TaskBlock = ({ dayTask }: TaskBlockType) => {
    const taskDueDate = new Date(dayTask.due_date);
    const taskDueHour = taskDueDate.getHours();
    const positionFromTop = (taskDueHour / 24) * 100;

    return (
        <ChakraLink
            as={ReactRouterLink}
            display={'inline-block'}
            position={'absolute'}
            minHeight={'25px'}
            width={'90%'}
            top={`${positionFromTop}%`}
            bgColor={'yellow'}
        >
            {dayTask.task_name}
        </ChakraLink>
    );
};

export default TaskBlock;
