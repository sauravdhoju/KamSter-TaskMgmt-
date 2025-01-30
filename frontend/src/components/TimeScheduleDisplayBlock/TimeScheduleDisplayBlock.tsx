import { useEffect, useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { GridItem, Box, Link as ChakraLink } from '@chakra-ui/react';
import { isSameDay } from 'date-fns';
import { useTaskContext, Task } from '../../contexts/TaskContext/TaskContext';

import TaskBlock from './TaskBlock';

type TimeScheduleDisplayBlockTypes = {
    blockDate: Date;
};

const TimeScheduleDisplayBlock = ({
    blockDate,
}: TimeScheduleDisplayBlockTypes) => {
    const { allTasks } = useTaskContext();
    const [dayTasks, setDayTasks] = useState<Task[]>([]);

    useEffect(() => {
        const tasks = allTasks.filter((task) => {
            return (
                isSameDay(new Date(task.due_date), blockDate) &&
                !task.is_completed
            );
        });
        console.log(tasks);

        setDayTasks(tasks);
    }, [allTasks, blockDate]);

    return (
        <GridItem borderLeft={'1px solid #0000007f'}>
            <Box
                display='grid'
                position={'relative'}
                gridTemplateRows={`repeat(24, 50px)`} // Matches time row height
                height='100%'
            >
                {Array.from({ length: 24 }).map((_, rowIndex) => (
                    <Box
                        key={rowIndex}
                        borderBottom={'1px solid #0000007f'}
                    ></Box>
                ))}
                {dayTasks.map((dayTask, index) => {
                    return <TaskBlock dayTask={dayTask} key={index} />;
                })}
            </Box>
        </GridItem>
    );
};

export default TimeScheduleDisplayBlock;
