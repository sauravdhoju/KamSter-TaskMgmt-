import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import './WeekView.scss';

type WeekViewTypes = {
    getHours: (hourType: 'ante' | 'post') => React.ReactNode[];
};

const WeekView = ({ getHours }: WeekViewTypes) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
        <Grid
            // bgColor={'#D9D9D9'}
            gridTemplateColumns={'max-content repeat(7, 1fr)'}
            gridTemplateRows={'min-content 1fr'}
            className='week-view'
            height={'100%'}
            overflowY={'auto'}
        >
            {daysOfWeek.map((day, index) => {
                return (
                    <GridItem
                        key={index}
                        gridColumn={`${index + 2}`}
                        borderLeft={'1px solid #0000007f'}
                        textAlign={'center'}
                        padding={'20px 0'}
                    >
                        <Text>
                            {index} - {day}
                        </Text>
                    </GridItem>
                );
            })}
            <GridItem>
                {getHours('ante')}
                {getHours('post')}
            </GridItem>
            {daysOfWeek.map((index) => {
                return (
                    <GridItem key={index} borderLeft={'1px solid #0000007f'}>
                        {Array.from({ length: 24 }, (_, i) => {
                            return (
                                <Box
                                    key={i}
                                    height={'50px'}
                                    borderBottom={'1px solid #0000007f'}
                                ></Box>
                            );
                        })}
                    </GridItem>
                );
            })}
        </Grid>
    );
};

export default WeekView;
