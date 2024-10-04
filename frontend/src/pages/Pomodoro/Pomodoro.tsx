import { useState } from 'react';
import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';

import Icon from '../../components/Icon/Icon';

import HeaderGreet from '../../components/HeaderGreet/HeaderGreet';
import Sidebar from '../../components/Sidebar/Sidebar';

import './Pomodoro.scss';

const Pomodoro = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <Flex
            className='pomodoro-page'
            width={'100%'}
            height={'100vh'}
            minH={'100vh'}
            flexDir={'row'}
        >
            <Sidebar
                isSideBarOpen={isSidebarOpen}
                setIsSideBarOpen={setIsSidebarOpen}
            />
            <Grid
                className='pomodoro-container'
                height={'100%'}
                justifyContent={'flex-start'}
                alignItems={'center'}
                flexDir={'column'}
                // templateRows={'repeat(2, 1fr)'}
                templateColumns={'1fr'}
                templateRows={'min-content 1fr'}
                flexGrow={1}
                padding={'0 10px'}
            >
                <HeaderGreet />
                <Box
                    className='pomodoro-timer'
                    bgColor={'red'}
                    justifySelf={'center'}
                    marginBottom={'85px'}
                    padding={'24px'}
                >
                    <Box className='timer-screen'>
                        <Text className='session-name'>BREAK</Text>
                        <Text className='session-countdown'>05:00</Text>
                    </Box>
                    <Grid
                        gridTemplateRows={'min-content min-content'}
                        gridTemplateColumns={'repeat(2, 1fr)'}
                        gap={'10px'}
                        className='action-buttons-container'
                    >
                        <GridItem
                            as={'button'}
                            className='action-btn action-btn-start'
                        >
                            Start
                        </GridItem>
                        <GridItem
                            as={'button'}
                            className='action-btn action-btn-reset'
                        >
                            Reset
                        </GridItem>
                        <GridItem className='set-action-btn set-break'>
                            <Box className='setter-container'>
                                <Box className='decrease-increase-btn'>
                                    <Icon
                                        name='bx-minus'
                                        className='inc-dec-icon'
                                    />
                                </Box>
                                <Text>5</Text>
                                <Box className='decrease-increase-btn'>
                                    <Icon
                                        name='bx-plus'
                                        className='inc-dec-icon'
                                    />
                                </Box>
                            </Box>
                            <Text>Break</Text>
                        </GridItem>
                        <GridItem className='set-action-btn set-session'>
                            <Box className='setter-container'>
                                <Box className='decrease-increase-btn'>
                                    <Icon
                                        name='bx-minus'
                                        className='inc-dec-icon'
                                    />
                                </Box>
                                <Text>25</Text>
                                <Box className='decrease-increase-btn'>
                                    <Icon
                                        name='bx-plus'
                                        className='inc-dec-icon'
                                    />
                                </Box>
                            </Box>
                            <Text>Session</Text>
                        </GridItem>
                    </Grid>
                </Box>
            </Grid>
        </Flex>
    );
};

export default Pomodoro;
