import { Flex } from '@chakra-ui/react';
import { lastDayOfMonth } from 'date-fns';

import { useCalendarContext } from '../../contexts/CalendarContext/CalendarContext';

import MonthGrid from '../MonthGrid/MonthGrid';
import './YearView.scss';
const YearView = () => {
    const { currentViewDate } = useCalendarContext();
    const months3L: (
        | 'Jan'
        | 'Feb'
        | 'Mar'
        | 'Apr'
        | 'May'
        | 'Jun'
        | 'Jul'
        | 'Aug'
        | 'Sep'
        | 'Oct'
        | 'Nov'
        | 'Dec'
    )[] = [
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
    const renderMonths = () => {
        const monthsArr: React.ReactNode[] = [];
        for (let i = 0; i < 12; ++i) {
            const currDate = new Date(currentViewDate.getFullYear(), i, 1);
            console.log(currDate);
            monthsArr.push(
                <MonthGrid
                    key={currDate.toString()}
                    monthName={months3L[i]}
                    numberOfDays={lastDayOfMonth(currDate).getDate()}
                    associatedDate={currDate}
                />
            );
        }
        return monthsArr;
    };
    return (
        <Flex
            width={'100%'}
            height={'100%'}
            flexWrap={'wrap'}
            gap={'30px'}
            justifyContent={'space-between'}
            className='year-view'
            overflowY={'auto'}
        >
            {renderMonths()}
        </Flex>
    );
};

export default YearView;
