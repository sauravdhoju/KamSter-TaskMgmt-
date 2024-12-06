import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { lastDayOfMonth } from 'date-fns';

import { useCalendarContext } from '../../contexts/CalendarContext/CalendarContext';

import ClickableDay from '../ClickableDay/ClickableDay';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MonthView = () => {
    const { currentViewDate } = useCalendarContext();
    const getOffsetDays = () => {
        const monthDate = new Date(currentViewDate);
        monthDate.setDate(1);
        return monthDate.getDay();
    };
    const firstDayOffset = getOffsetDays();
    const daysInMonth = lastDayOfMonth(currentViewDate).getDate();

    const renderOffsetDays = (offSetType: 'before' | 'after') => {
        const offsetDates: React.ReactNode[] = [];
        if (offSetType === 'before') {
            // this month starts at Sunday
            if (firstDayOffset === 0) return offsetDates;
            const firstOffsetDate = new Date(currentViewDate);
            firstOffsetDate.setDate(1);
            firstOffsetDate.setDate(firstOffsetDate.getDate() - firstDayOffset);
            for (let i = 0; i < firstDayOffset; ++i) {
                const currDate = new Date(firstOffsetDate);
                currDate.setDate(currDate.getDate() + i);
                offsetDates.push(
                    <ClickableDay
                        associatedDate={currDate}
                        key={currDate.toString()}
                    />
                );
            }
        } else if (offSetType === 'after') {
            if (lastDayOfMonth(currentViewDate).getDay() === 6)
                return offsetDates;
            const firstOffsetDate = new Date(lastDayOfMonth(currentViewDate));
            firstOffsetDate.setDate(firstOffsetDate.getDate() + 1);
            for (let i = 0; i < 7 - firstOffsetDate.getDay(); ++i) {
                const currDate = new Date(firstOffsetDate);
                currDate.setDate(currDate.getDate() + i);
                offsetDates.push(
                    <ClickableDay
                        associatedDate={currDate}
                        key={currDate.toString()}
                    />
                );
            }
        }
        return offsetDates;
    };

    return (
        <Box bgColor={'#D9D9D9'} width={'100%'} height={'100%'} padding={'3px'}>
            {/* Days of the week */}
            <Grid
                width={'100%'}
                height={'100%'}
                templateColumns={'repeat(7, 1fr)'}
                templateRows={'min-content'}
                justifyContent={'center'}
                gap={'3px'}
                fontWeight={400}
            >
                {daysOfWeek.map((day) => (
                    <GridItem
                        height={''}
                        key={day}
                        className='day-header'
                        textAlign='center'
                        justifyContent={'center'}
                        alignItems={'center'}
                        paddingY={'25px'}
                    >
                        <Text fontSize={'20px'}>{day}</Text>
                    </GridItem>
                ))}

                {/* Days of the month */}
                {renderOffsetDays('before')}
                {Array.from({ length: daysInMonth }, (_, i) => {
                    const dayDate = new Date(currentViewDate);
                    dayDate.setDate(i + 1);

                    return (
                        <ClickableDay
                            associatedDate={dayDate}
                            key={dayDate.toString()}
                        />
                    );
                })}
                {renderOffsetDays('after')}
            </Grid>
        </Box>
    );
};

export default MonthView;
