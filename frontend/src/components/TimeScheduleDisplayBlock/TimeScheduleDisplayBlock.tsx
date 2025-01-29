import { useEffect, useState } from 'react';
import { GridItem, Box } from '@chakra-ui/react';
import { isSameDay } from 'date-fns';
import { useTaskContext, Task } from '../../contexts/TaskContext/TaskContext';

type TimeScheduleDisplayBlockTypes = {
    blockDate: Date;
};

const TimeScheduleDisplayBlock = ({
    blockDate,
}: TimeScheduleDisplayBlockTypes) => {
    const { taskLists } = useTaskContext();
    const [dayTasks, setDayTasks] = useState<Task[]>([]);

    useEffect(() => {
        console.log(taskLists.map((taskList) => taskList.tasks).flat());

        const tasks = taskLists
            .map((taskList) => taskList.tasks)
            .flat()
            .filter((task) => isSameDay(new Date(task.due_date), blockDate));
        console.log(tasks);
    }, [taskLists]);

    return (
        <GridItem borderLeft={'1px solid #0000007f'}>
            <Box
                display='grid'
                gridTemplateRows={`repeat(24, 50px)`} // Matches time row height
                height='100%'
            >
                {Array.from({ length: 24 }).map((_, rowIndex) => (
                    <Box
                        key={rowIndex}
                        borderBottom={'1px solid #0000007f'}
                    ></Box>
                ))}
            </Box>
        </GridItem>
    );
};

export default TimeScheduleDisplayBlock;
