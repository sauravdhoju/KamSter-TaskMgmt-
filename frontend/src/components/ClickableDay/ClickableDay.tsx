import { GridItem, Text } from '@chakra-ui/react';
import { isToday } from 'date-fns';

import { useCalendarContext } from '../../contexts/CalendarContext/CalendarContext';

import './ClickableDay.scss';

type ClickableDayType = {
    associatedDate: Date;
};

const ClickableDay = ({ associatedDate }: ClickableDayType) => {
    const { setCurrentViewDate, setCurrentView } = useCalendarContext();
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
    const dayDate = associatedDate.getDate();
    return (
        <GridItem
            p='10px'
            display={'flex'}
            justifyContent={'center'}
            bgColor={'#E5E5E5'}
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
        </GridItem>
    );
};

export default ClickableDay;
