import { Flex } from '@chakra-ui/react';
import MonthGrid from '../MonthGrid/MonthGrid';
import './YearView.scss';
const YearView = () => {
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
            <MonthGrid startingDay={1} numberOfDays={30} monthName='Jan' />
            <MonthGrid startingDay={1} numberOfDays={30} monthName='Jan' />
            <MonthGrid startingDay={1} numberOfDays={30} monthName='Jan' />
            <MonthGrid startingDay={1} numberOfDays={30} monthName='Jan' />
            <MonthGrid startingDay={1} numberOfDays={30} monthName='Jan' />
            <MonthGrid startingDay={1} numberOfDays={30} monthName='Jan' />
            <MonthGrid startingDay={1} numberOfDays={30} monthName='Jan' />
            <MonthGrid startingDay={1} numberOfDays={30} monthName='Jan' />
            <MonthGrid startingDay={1} numberOfDays={30} monthName='Jan' />
            <MonthGrid startingDay={1} numberOfDays={30} monthName='Jan' />
            <MonthGrid startingDay={1} numberOfDays={30} monthName='Jan' />
            <MonthGrid startingDay={1} numberOfDays={30} monthName='Jan' />
        </Flex>
    );
};

export default YearView;
