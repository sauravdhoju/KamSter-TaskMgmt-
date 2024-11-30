import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { getDefaultOptions } from 'date-fns';
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MonthView = () => {
    const daysInMonth = 30;
    const firstDayOffset = 2; //  for starting day
    console.log(getDefaultOptions());

    return (
        <Box bgColor={'#D9D9D9'} width={'100%'} height={'100%'} padding={'3px'}>
            {/* Days of the week */}
            <Grid
                width={'100%'}
                height={'100%'}
                templateColumns={'repeat(7, 1fr)'}
                templateRows={'min-content repeat(5, 1fr)'}
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
                {Array.from({ length: firstDayOffset }).map((_, index) => (
                    <GridItem key={`empty-${index}`} />
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1;
                    const isSaturday = (firstDayOffset + day) % 7 === 0;

                    return (
                        <GridItem
                            key={day}
                            className={`day-box ${
                                isSaturday ? 'saturday' : ''
                            }`}
                            p='10px'
                            display={'flex'}
                            justifyContent={'center'}
                            bgColor={'#E5E5E5'}
                        >
                            <Text
                                fontSize='20px'
                                color={isSaturday ? 'red.500' : 'black'}
                            >
                                {day}
                            </Text>
                        </GridItem>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default MonthView;
