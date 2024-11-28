import { Box, Text } from '@chakra-ui/react';
import MonthView from './MonthView';
import DayView from './DayView';
import WeekView from './WeekView';
import './CalendarView.scss';

type CalendarViewTypes = {
    currentView: 'year' | 'month' | 'week' | 'day';
    viewDay: string;
};

const CalendarView = ({ currentView, viewDay }: CalendarViewTypes) => {
    // returns the hours that you see in left side of week and days view
    const getHours = (hourType: 'ante' | 'post') => {
        let timestampBlocks: React.ReactNode[] = Array.from(
            { length: 12 },
            (_, i) => {
                if (i === 0) {
                    return (
                        <Box
                            className='day-timestamp-block'
                            borderBottom={'1px solid #0000007f'}
                            height={'50px'}
                            paddingX={'20px'}
                        >
                            {hourType === 'ante' ? (
                                <Text className='timestamp-block-hour'></Text>
                            ) : (
                                <Text className='timestamp-block-hour'>{`12:00 PM`}</Text>
                            )}
                        </Box>
                    );
                }
                return (
                    <Box
                        className='day-timestamp-block'
                        borderBottom={'1px solid #0000007f'}
                        height={'50px'}
                        paddingX={'20px'}
                    >
                        <Text className='timestamp-block-hour'>{`${
                            i < 10 ? '0' + i : i
                        }:00 ${hourType === 'ante' ? 'AM' : 'PM'}`}</Text>
                    </Box>
                );
            }
        );
        return timestampBlocks;
    };
    const renderCurrentView = () => {
        if (currentView === 'day')
            return <DayView viewDay={viewDay} getHours={getHours} />;
        if (currentView === 'month') return <MonthView />;
        if (currentView === 'week') return <WeekView getHours={getHours} />;
    };

    return (
        <Box flexGrow={1} className='calendar-view'>
            {renderCurrentView()}
        </Box>
    );
};

export default CalendarView;
