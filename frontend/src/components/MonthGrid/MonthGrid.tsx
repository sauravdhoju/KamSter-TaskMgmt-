import { Grid, GridItem, Text } from '@chakra-ui/react';
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
    startingDay: number;
    numberOfDays: number;
};
const MonthGrid = ({ monthName, startingDay, numberOfDays }: MonthGridType) => {
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const renderDays = () => {
        const daysArr = [];
        for (let i = 0; i < startingDay; ++i) {
            daysArr.push(<GridItem key={i}></GridItem>);
        }

        for (let i = 0; i < numberOfDays; ++i) {
            daysArr.push(
                <GridItem
                    key={i}
                    width={'25px'}
                    height={'25px'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Text fontSize={'12px'}>{i + 1}</Text>
                </GridItem>
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
                    gridTemplateRows={'repeat(6, max-content)'}
                    gridTemplateColumns={'repeat(7, max-content)'}
                >
                    {daysOfWeek.map((day, index) => {
                        return (
                            <GridItem
                                key={index}
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
                    {renderDays()}
                </Grid>
            </GridItem>
        </Grid>
    );
};

export default MonthGrid;
