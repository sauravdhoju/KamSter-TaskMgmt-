import { useState } from 'react';
import { GridItem, Text, Box } from '@chakra-ui/react';
import { isToday, isSameDay } from 'date-fns';

import { useCalendarContext } from '../../contexts/CalendarContext/CalendarContext';
import { useTaskContext } from '../../contexts/TaskContext/TaskContext';

import './ClickableDay.scss';
import { useEffect } from 'react';

type ClickableDayType = {
    associatedDate: Date;
};

const ClickableDay = ({ associatedDate }: ClickableDayType) => {
    const { setCurrentViewDate, setCurrentView } = useCalendarContext();
    const [tasksCount, setTaskCount] = useState(0);
    const { allTasks } = useTaskContext();

    const months3L = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    useEffect(() => {
        setTaskCount(() => {
            const count = allTasks.filter((task) => {
                return (
                    isSameDay(new Date(task.due_date), associatedDate) &&
                    !task.is_completed
                );
            }).length;
            return count > 10 ? 10 : count;
        });
    }, [allTasks]);

    const dayDate = associatedDate.getDate();
    return (
        <GridItem
            p='10px'
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDir={'column'}
            bgColor={'#E5E5E5'}
            gap={'5px'}
        >
            <Text
                onClick={() => {
                    setCurrentViewDate(new Date(associatedDate));
                    setCurrentView('day');
                }}
            >
                {dayDate === 1 && months3L[associatedDate.getMonth()]}{' '}
                <Text
                    as={'span'}
                    display={'inline-flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    width={'30px'}
                    height={'30px'}
                    borderRadius={'50%'}
                    bgColor={isToday(associatedDate) ? '#3a3838' : 'none'}
                    color={isToday(associatedDate) ? 'white' : 'inherit'}
                >
                    {dayDate}
                </Text>
            </Text>
            <Box
                maxWidth={'50%'}
                display={'flex'}
                justifyContent={'center'}
                gap={'5px'}
                flexWrap={'wrap'}
                // bgColor={'red'}
            >
                {Array.from({ length: tasksCount }).map((_, rowIndex) => (
                    <Box
                        key={rowIndex}
                        borderRadius={'50%'}
                        width={'10px'}
                        height={'10px'}
                        bgColor={'blue'}
                    ></Box>
                ))}
            </Box>
        </GridItem>
    );
};

export default ClickableDay;
