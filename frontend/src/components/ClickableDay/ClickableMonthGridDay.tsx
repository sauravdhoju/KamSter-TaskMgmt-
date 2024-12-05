import { GridItem, Text } from '@chakra-ui/react';
import { isToday } from 'date-fns';

import { useCalendarContext } from '../../contexts/CalendarContext/CalendarContext';

type ClickableMonthGridDayType = {
    associatedDate: Date;
    isSameMonth?: boolean;
};

const ClickableMonthGridDay = ({
    associatedDate,
    isSameMonth,
}: ClickableMonthGridDayType) => {
    const { setCurrentView, setCurrentViewDate } = useCalendarContext();
    return (
        <GridItem
            key={associatedDate.toString()}
            width={'25px'}
            height={'25px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            opacity={isSameMonth ? '1' : '0.5'}
            onClick={() => {
                setCurrentViewDate(new Date(associatedDate));
                setCurrentView('day');
            }}
        >
            <Text
                fontSize={'12px'}
                display={'inline-flex'}
                justifyContent={'center'}
                alignItems={'center'}
                minW={'20px'}
                aspectRatio={'1/1'}
                borderRadius={'50%'}
                bgColor={
                    isSameMonth && isToday(associatedDate) ? '#3a3838' : 'none'
                }
                color={
                    isSameMonth && isToday(associatedDate) ? 'white' : 'inherit'
                }
            >
                {associatedDate.getDate()}
            </Text>
        </GridItem>
    );
};

export default ClickableMonthGridDay;
