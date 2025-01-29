import { useEffect, useState } from 'react';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { previousSunday, isToday } from 'date-fns';

import { useCalendarContext } from '../../contexts/CalendarContext/CalendarContext';
import TimeScheduleDisplayBlock from '../TimeScheduleDisplayBlock/TimeScheduleDisplayBlock';

import './WeekView.scss';

type WeekViewTypes = {
    getHours: (hourType: 'ante' | 'post') => React.ReactNode[];
};

const WeekView = ({ getHours }: WeekViewTypes) => {
    const {
        currentViewDate,
        getViewDayString,
        setCurrentViewDate,
        setCurrentView,
    } = useCalendarContext();
    const getWeekDates = () => {
        const weekDates = [];
        // init week's Sunday
        const weekSunday =
            currentViewDate.getDay() === 0
                ? currentViewDate
                : previousSunday(currentViewDate);

        for (let i = 0; i < 7; ++i) {
            const currDate = new Date(weekSunday);
            currDate.setDate(weekSunday.getDate() + i);
            weekDates.push(new Date(currDate));
        }

        return weekDates;
    };
    const [weekDates, setWeekDates] = useState<Date[]>(() => getWeekDates());

    useEffect(() => {
        setWeekDates(getWeekDates());
    }, [currentViewDate]);

    return (
        <Grid
            // bgColor={'#D9D9D9'}
            gridTemplateColumns={'max-content repeat(7, 1fr)'}
            gridTemplateRows={'min-content 1fr'}
            className='week-view'
            height={'100%'}
            overflowY={'auto'}
        >
            <GridItem
                textAlign={'center'}
                padding={'20px 0'}
                borderBottom={'1px solid #0000007f'}
            >
                <Text>Time / Day</Text>
            </GridItem>
            {weekDates.map((date, index) => {
                return (
                    <GridItem
                        key={index}
                        gridColumn={`${index + 2}`}
                        borderLeft={'1px solid #0000007f'}
                        textAlign={'center'}
                        padding={'20px 0'}
                        bgColor={isToday(date) ? '#3a3838' : '#d9d9d9'}
                        color={isToday(date) ? 'white' : 'inherit'}
                        borderBottom={'1px solid #0000007f'}
                    >
                        <Text
                            _hover={{ cursor: 'pointer' }}
                            onClick={() => {
                                setCurrentView('day');
                                setCurrentViewDate(new Date(date));
                            }}
                        >
                            {getViewDayString(date)}
                        </Text>
                    </GridItem>
                );
            })}
            <GridItem>
                {getHours('ante')}
                {getHours('post')}
            </GridItem>
            {weekDates.map((_, index) => {
                return (
                    <TimeScheduleDisplayBlock
                        key={index}
                        blockDate={new Date()}
                    />
                );
            })}
        </Grid>
    );
};

export default WeekView;
