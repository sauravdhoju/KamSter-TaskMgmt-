import { useState, useEffect } from 'react';
import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';

import Icon from '../../components/Icon/Icon';

import HeaderGreet from '../../components/HeaderGreet/HeaderGreet';
import Sidebar from '../../components/Sidebar/Sidebar';

import './Pomodoro.scss';

const Pomodoro = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [breakTime, setBreakTime] = useState(300000);
    const [sessionTime, setSessionTime] = useState(1500000);
    const [sessionType, setSessionType] = useState<'break' | 'session'>(
        'session'
    );

    const [sessionCountDownString, setSessionCountDownString] =
        useState('25:00');
    const [breakCountDownString, setBreakCountDownString] = useState('05:00');

    const getTimeString = (time: Date) => {
        const min = time.getMinutes();
        const sec = time.getSeconds();
        const timeStr = `${min < 10 ? '0' + min : min}:${
            sec < 10 ? '0' + sec : sec
        }`;
        return timeStr;
    };

    useEffect(() => {}, [breakTime, sessionTime]);

    const handleTimerIncreaseDecrease = (
        type: 'break' | 'session',
        incDec: 'increase' | 'decrease'
    ) => {
        const time = new Date();
        time.setHours(0, 0, 0, 0);
        if (type === 'break') {
            if (incDec === 'increase') {
                if (breakTime + 60000 > 1800000) return;
                setBreakTime(breakTime + 60000);
                time.setMilliseconds(breakTime + 60000);

                setBreakCountDownString(getTimeString(time));
            } else if (incDec === 'decrease') {
                if (breakTime - 60000 <= 0) return;
                setBreakTime(breakTime - 60000);
                time.setMilliseconds(breakTime - 60000);

                setBreakCountDownString(getTimeString(time));
            }
        } else if (type === 'session') {
            if (incDec === 'increase') {
                if (sessionTime + 60000 >= 3600000) return;
                setSessionTime(sessionTime + 60000);
                time.setMilliseconds(sessionTime + 60000);

                setSessionCountDownString(getTimeString(time));
            } else if (incDec === 'decrease') {
                if (sessionTime - 60000 <= 0) return;
                setSessionTime(sessionTime - 60000);
                time.setMilliseconds(sessionTime - 60000);

                setSessionCountDownString(getTimeString(time));
            }
        }
    };

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
                    width={'330px'}
                    justifySelf={'center'}
                    marginBottom={'85px'}
                    padding={'24px'}
                >
                    <Box className='timer-screen'>
                        <Text className='session-name'>
                            {sessionType === 'break' ? 'BREAK' : 'SESSION'}
                        </Text>
                        <Text className='session-countdown'>
                            {sessionType === 'break'
                                ? breakCountDownString
                                : sessionCountDownString}
                        </Text>
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
                                <Box
                                    className='decrease-increase-btn'
                                    onClick={() =>
                                        handleTimerIncreaseDecrease(
                                            'break',
                                            'decrease'
                                        )
                                    }
                                >
                                    <Icon
                                        name='bx-minus'
                                        className='inc-dec-icon'
                                    />
                                </Box>
                                <Text>
                                    {breakTime / 60000 < 10
                                        ? '0' + breakTime / 60000
                                        : breakTime / 60000}
                                </Text>
                                <Box
                                    className='decrease-increase-btn'
                                    onClick={() =>
                                        handleTimerIncreaseDecrease(
                                            'break',
                                            'increase'
                                        )
                                    }
                                >
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
                                <Box
                                    className='decrease-increase-btn'
                                    onClick={() =>
                                        handleTimerIncreaseDecrease(
                                            'session',
                                            'decrease'
                                        )
                                    }
                                >
                                    <Icon
                                        name='bx-minus'
                                        className='inc-dec-icon'
                                    />
                                </Box>
                                <Text>{sessionTime / 60000}</Text>
                                <Box
                                    className='decrease-increase-btn'
                                    onClick={() =>
                                        handleTimerIncreaseDecrease(
                                            'session',
                                            'increase'
                                        )
                                    }
                                >
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
