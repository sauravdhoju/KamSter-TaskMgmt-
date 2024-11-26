import { Box, Grid, Text } from '@chakra-ui/react';
import { getDefaultOptions } from 'date-fns';
const months = [
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
const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
const MonthView = () => {
    const daysInMonth = 30;
    const firstDayOffset = 2; //  for starting day
    console.log(getDefaultOptions());

    return (
        <Box className='calendar-container'>
            {/* Days of the week */}
            <Grid
                templateColumns='repeat(7, 1fr)'
                className='calendar-grid-header'
            >
                {daysOfWeek.map((day) => (
                    <Text key={day} className='day-header' textAlign='center'>
                        {day}
                    </Text>
                ))}
            </Grid>

            {/* Days of the month */}
            <Grid templateColumns='repeat(7, 1fr)' className='calendar-grid'>
                {Array.from({ length: firstDayOffset }).map((_, index) => (
                    <Box key={`empty-${index}`} />
                ))}

                {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1;
                    const isSaturday = (firstDayOffset + day) % 7 === 0;

                    return (
                        <Box
                            key={day}
                            className={`day-box ${
                                isSaturday ? 'saturday' : ''
                            }`}
                            p='10px'
                            textAlign='center'
                        >
                            <Text
                                fontSize='md'
                                color={isSaturday ? 'red.500' : 'black'}
                            >
                                {day}
                            </Text>
                        </Box>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default MonthView;
