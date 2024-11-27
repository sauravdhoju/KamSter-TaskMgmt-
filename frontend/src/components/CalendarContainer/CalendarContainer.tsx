import { Box, Grid, GridItem } from '@chakra-ui/react';

import PageContainer from '../PageContainer/PageContainer';
import CalendarTopBar from '../CalendarTopBar/CalendarTopBar';

type CalendarContainerType = {
    currentView: 'year' | 'month' | 'week' | 'day';
    setCurrentView: React.Dispatch<
        React.SetStateAction<CalendarContainerType['currentView']>
    >;
};

const CalendarContainer: React.FC<
    React.PropsWithChildren<CalendarContainerType>
> = ({ children, currentView, setCurrentView }) => {
    return (
        <PageContainer>
            <Grid
                className='calendar-container'
                width={'100%'}
                height={'100%'}
                maxH={'100%'}
                padding={'20px 0'}
                gap={'10px'}
                gridTemplateRows={'min-content 1fr'}
                gridTemplateColumns={'1fr'}
            >
                <GridItem width={'100%'}>
                    <CalendarTopBar
                        currentView={currentView}
                        setCurrentView={setCurrentView}
                    />
                </GridItem>
                <GridItem maxH={'100%'} overflowY={'auto'}>
                    {children}
                </GridItem>
            </Grid>
        </PageContainer>
    );
};

export default CalendarContainer;
