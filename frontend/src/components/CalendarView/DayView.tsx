import { useEffect, useState } from 'react';
import { Grid, GridItem, Text } from '@chakra-ui/react';
import { isToday } from 'date-fns';

import { useCalendarContext } from '../../contexts/CalendarContext/CalendarContext';

import './DayView.scss';
type DayView = {
    getHours: (hourType: 'ante' | 'post') => React.ReactNode[];
};
const DayView = ({ getHours }: DayView) => {
    const { currentViewDate, getViewDayString } = useCalendarContext();
    const [viewDayString, setViewDayString] = useState(() =>
        getViewDayString(currentViewDate)
    );
    useEffect(() => {
        setViewDayString(getViewDayString(currentViewDate));
    }, [currentViewDate]);
    return (
        <Grid
            bgColor={'#D9D9D9'}
            gridTemplateColumns={'1fr'}
            gridTemplateRows={'min-content 1fr'}
            gap={'5px'}
            className={`day-view ${
                isToday(currentViewDate) ? 'day-view-today' : ''
            }`}
            height={'100%'}
        >
            <GridItem
                className='day-name-date'
                width={'100%'}
                textAlign={'center'}
                paddingY={'20px'}
            >
                <Text>{viewDayString}</Text>
            </GridItem>
            <GridItem
                className='day-timestamp-container'
                bgColor={'#e5e5e5'}
                // bgColor={'yellow'}
                height={'100%'}
                maxH={'100%'}
                overflowY={'scroll'}
            >
                {getHours('ante')}
                {getHours('post')}
            </GridItem>
        </Grid>
    );
};

export default DayView;
