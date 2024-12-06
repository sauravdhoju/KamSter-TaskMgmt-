import { Grid, GridItem, Text } from '@chakra-ui/react';
import { lastDayOfMonth } from 'date-fns';

import ClickableMonthGridDay from '../ClickableDay/ClickableMonthGridDay';
import './MonthGrid.scss';
type MonthGridType = {
    monthName:
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
        | 'Dec';
    numberOfDays: number;
    associatedDate: Date;
};
const MonthGrid = ({
    monthName,
    numberOfDays,
    associatedDate,
}: MonthGridType) => {
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const daysOfWeek3L = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const firstDayOffset = associatedDate.getDay();

    const renderOffsetDays = (offSetType: 'before' | 'after') => {
        const offsetDates: React.ReactNode[] = [];
        if (offSetType === 'before') {
            // this month starts at Sunday
            if (firstDayOffset === 0) return offsetDates;
            const firstOffsetDate = new Date(associatedDate);
            firstOffsetDate.setDate(1);
            firstOffsetDate.setDate(firstOffsetDate.getDate() - firstDayOffset);
            for (let i = 0; i < firstDayOffset; ++i) {
                const currDate = new Date(firstOffsetDate);
                currDate.setDate(currDate.getDate() + i);
                offsetDates.push(
                    <ClickableMonthGridDay
                        associatedDate={currDate}
                        key={currDate.toString()}
                    />
                );
            }
        } else if (offSetType === 'after') {
            const firstOffsetDate = new Date(lastDayOfMonth(associatedDate));
            firstOffsetDate.setDate(firstOffsetDate.getDate() + 1);
            for (let i = 0; i < 42 - numberOfDays - firstDayOffset; ++i) {
                const currDate = new Date(
                    firstOffsetDate.getFullYear(),
                    firstOffsetDate.getMonth(),
                    firstOffsetDate.getDate() + i
                );
                offsetDates.push(
                    <ClickableMonthGridDay
                        associatedDate={currDate}
                        key={currDate.toString()}
                    />
                );
            }
        }
        return offsetDates;
    };
    const renderDays = () => {
        const daysArr = [];

        for (let i = 0; i < numberOfDays; ++i) {
            const currDate = new Date(
                associatedDate.getFullYear(),
                associatedDate.getMonth(),
                i + 1
            );
            daysArr.push(
                <ClickableMonthGridDay
                    key={currDate.toString()}
                    associatedDate={currDate}
                    isSameMonth
                />
            );
        }
        return daysArr;
    };
    return (
        <Grid
            gridTemplate={'max-content max-content / max-content'}
            className='month-grid'
            flex={'1 0 21%'}
            gap={'12px'}
        >
            <GridItem
                textAlign={'center'}
                width={'100px'}
                paddingY={'5px'}
                margin={'0 auto'}
                bgColor={'#D9D9D9'}
            >
                <Text>{monthName}</Text>
            </GridItem>
            <GridItem>
                <Grid
                    gap={'12px'}
                    gridTemplateRows={'repeat(7, max-content)'}
                    gridTemplateColumns={'repeat(7, max-content)'}
                >
                    {daysOfWeek.map((day, index) => {
                        return (
                            <GridItem
                                key={daysOfWeek3L[index]}
                                width={'25px'}
                                height={'25px'}
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <Text fontSize={'12px'}>{day}</Text>
                            </GridItem>
                        );
                    })}
                    {renderOffsetDays('before')}
                    {renderDays()}
                    {renderOffsetDays('after')}
                </Grid>
            </GridItem>
        </Grid>
    );
};

export default MonthGrid;
