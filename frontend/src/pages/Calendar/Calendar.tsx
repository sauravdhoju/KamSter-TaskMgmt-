import { useState } from 'react';
import CalendarContainer from '../../components/CalendarContainer/CalendarContainer';
import CalendarView from '../../components/CalendarView/CalendarView';
const Calendar = () => {
    const today = new Date();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const getViewDayString = () => {
        const dateString = `${
            today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
        }`;
        return `${dateString} - ${daysOfWeek[today.getDay()]}`;
    };
    const [viewDay, setViewDay] = useState(
        `${today.getDate()} - ${daysOfWeek[today.getDay()]}`
    );
    const [currentView, setCurrentView] = useState<
        'year' | 'month' | 'week' | 'day'
    >('day');
    return (
        <CalendarContainer
            currentView={currentView}
            setCurrentView={setCurrentView}
        >
            <CalendarView currentView={currentView} viewDay={viewDay} />
        </CalendarContainer>
    );
};

export default Calendar;
