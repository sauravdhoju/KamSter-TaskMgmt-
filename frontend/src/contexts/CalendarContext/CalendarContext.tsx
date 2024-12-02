import { useState, useContext, createContext } from 'react';
import { previousSunday, nextSaturday } from 'date-fns';
type CalendarContextType = {
    today: Date;
    currentViewDate: Date;
    setCurrentViewDate: React.Dispatch<React.SetStateAction<Date>>;
    currentView: 'year' | 'month' | 'week' | 'day';
    setCurrentView: React.Dispatch<
        React.SetStateAction<CalendarContextType['currentView']>
    >;
    getViewDayString: (todayDate: Date) => string;
    getCalendarTopBarDateString: () => string;
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
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    // const daysOfWeek1L = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    // get "date - day" format string from given date
    const getViewDayString = (date: Date) => {
        const dateString = `${
            date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        }`;
        return `${dateString} - ${daysOfWeek3L[date.getDay()]}`;
    };

    // that top bar string between two arrows
    const getCalendarTopBarDateString = () => {
        if (currentView === 'year') {
            return currentViewDate.getFullYear().toString();
        }
        if (currentView === 'month') {
            return `${
                months[currentViewDate.getMonth()]
            } ${currentViewDate.getFullYear()}`;
        }
        if (currentView === 'week') {
            if (
                previousSunday(currentViewDate).getMonth() ===
                nextSaturday(currentViewDate).getMonth()
            ) {
                return `${
                    months[currentViewDate.getMonth()]
                } ${currentViewDate.getFullYear()}`;
            }
            return `${
                months[currentViewDate.getMonth()]
            } ${currentViewDate.getFullYear()} - ${
                months[currentViewDate.getMonth()]
            } ${currentViewDate.getFullYear()}`;
        }
        return `${currentViewDate.getDate()} ${
            months[currentViewDate.getMonth()]
        } ${currentViewDate.getFullYear()}`;
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
                getCalendarTopBarDateString,
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
