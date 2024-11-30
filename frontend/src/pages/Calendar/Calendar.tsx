import CalendarContextProvider from '../../contexts/CalendarContext/CalendarContext';

import CalendarContainer from '../../components/CalendarContainer/CalendarContainer';
import CalendarView from '../../components/CalendarView/CalendarView';
const Calendar = () => {
    return (
        <CalendarContextProvider>
            <CalendarContainer>
                <CalendarView />
            </CalendarContainer>
        </CalendarContextProvider>
    );
};

export default Calendar;
