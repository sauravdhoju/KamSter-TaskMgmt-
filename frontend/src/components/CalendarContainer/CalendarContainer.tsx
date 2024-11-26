import { Box } from '@chakra-ui/react';

import PageContainer from '../PageContainer/PageContainer';
import CalendarTopBar from '../CalendarTopBar/CalendarTopBar';

const CalendarContainer: React.FC<React.PropsWithChildren<{}>> = ({
    children,
}) => {
    return (
        <PageContainer>
            <Box
                className='calendar-container'
                width={'100%'}
                height={'100%'}
                padding={'20px 0'}
            >
                <CalendarTopBar />
                {children}
            </Box>
        </PageContainer>
    );
};

export default CalendarContainer;
