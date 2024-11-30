import { Grid, GridItem } from '@chakra-ui/react';

import PageContainer from '../PageContainer/PageContainer';
import CalendarTopBar from '../CalendarTopBar/CalendarTopBar';

const CalendarContainer: React.FC<React.PropsWithChildren<{}>> = ({
    children,
}) => {
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
                    <CalendarTopBar />
                </GridItem>
                <GridItem maxH={'100%'} overflowY={'auto'}>
                    {children}
                </GridItem>
            </Grid>
        </PageContainer>
    );
};

export default CalendarContainer;
