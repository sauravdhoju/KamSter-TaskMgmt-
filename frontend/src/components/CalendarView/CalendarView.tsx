import { Box } from '@chakra-ui/react';
import MonthView from './MonthView';
import DayView from './DayView';
import './CalendarView.scss';

type CalendarViewTypes = {
    currentView: 'year' | 'month' | 'week' | 'day';
    viewDay: string;
};

const CalendarView = ({ currentView, viewDay }: CalendarViewTypes) => {
    const renderCurrentView = () => {
        if (currentView === 'day') return <DayView viewDay={viewDay} />;
        if (currentView === 'month') return <MonthView />;
    };

    return (
        <Box flexGrow={1} className='calendar-view'>
            {renderCurrentView()}
        </Box>
    );
};

export default CalendarView;
