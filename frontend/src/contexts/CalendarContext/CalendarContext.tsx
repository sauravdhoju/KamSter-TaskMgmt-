import { useState, useContext, createContext } from 'react';
type CalendarContextType = {
    today: Date;
    currentViewDate: Date;
    setCurrentViewDate: React.Dispatch<React.SetStateAction<Date>>;
    currentView: 'year' | 'month' | 'week' | 'day';
    setCurrentView: React.Dispatch<
        React.SetStateAction<CalendarContextType['currentView']>
    >;
    getViewDayString: (todayDate: Date) => string;
};
const CalendarContext = createContext<CalendarContextType | null>(null);

const CalendarContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children,
}) => {
    // system date
    const today = new Date();
    // view date for indication of date when client is using the website
    const [currentViewDate, setCurrentViewDate] = useState(today);
    const daysOfWeek3L = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // const daysOfWeek1L = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    // get "date - day" format string from given date
    const getViewDayString = (date: Date) => {
        const dateString = `${
            date.getDate() < 10 ? '0' + today.getDate() : today.getDate()
        }`;
        return `${dateString} - ${daysOfWeek3L[today.getDay()]}`;
    };
    // calendar layout view
    const [currentView, setCurrentView] = useState<
        'year' | 'month' | 'week' | 'day'
    >('day');
    return (
        <CalendarContext.Provider
            value={{
                today,
                currentViewDate,
                setCurrentViewDate,
                currentView,
                setCurrentView,
                getViewDayString,
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
};

export const useCalendarContext = () => {
    const calendar = useContext(CalendarContext);
    if (!calendar) {
        throw new Error(
            'useCalendarContext must be used within a CalendarContextProvider'
        );
    }
    return calendar;
};
export default CalendarContextProvider;
