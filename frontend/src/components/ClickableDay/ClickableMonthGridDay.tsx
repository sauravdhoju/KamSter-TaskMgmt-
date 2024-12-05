import { GridItem, Text } from '@chakra-ui/react';

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
            <Text fontSize={'12px'}>{associatedDate.getDate()}</Text>
        </GridItem>
    );
};

export default ClickableMonthGridDay;
