import { useState, useEffect } from 'react';
import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';

import Icon from '../../components/Icon/Icon';

import HeaderGreet from '../../components/HeaderGreet/HeaderGreet';
import Sidebar from '../../components/Sidebar/Sidebar';

import './Pomodoro.scss';

const Pomodoro = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [sessionType, setSessionType] = useState<'break' | 'session'>(
        'session'
    );
    const [timerState, setTimerState] = useState<'started' | 'stopped'>(
        'stopped'
    );

    const [inputBreakTime, setInputBreakTime] = useState(
        new Date(0, 0, 0, 0, 5, 0)
    );
    const [inputSessionTime, setInputSessionTime] = useState(
        new Date(0, 0, 0, 0, 25, 0)
    );
    const [timerBreakTime, setTimerBreakTime] = useState(
        new Date(0, 0, 0, 0, 0, 0, 0)
    );
    const [timerSessionTime, setTimerSessionTime] = useState(
        new Date(0, 0, 0, 0, 0, 0, 0)
    );

    const getTimeString = (time: Date) => {
        const min = time.getMinutes();
        const sec = time.getSeconds();
        const timeStr = `${min < 10 ? '0' + min : min}:${
            sec < 10 ? '0' + sec : sec
        }`;
        return timeStr;
    };

    const handleTimerIncreaseDecrease = (
        sesType: 'break' | 'session',
        opType: 'increase' | 'decrease'
    ) => {
        if (opType === 'increase') {
            if (sesType === 'break') {
                let breakMins = inputBreakTime.getMinutes();
                if (breakMins >= 30) return;
                setInputBreakTime(new Date(0, 0, 0, 0, breakMins + 1, 0, 0));
            } else {
                let sessionMins = inputSessionTime.getMinutes();
                if (sessionMins >= 59) return;
                setInputSessionTime(
                    new Date(0, 0, 0, 0, sessionMins + 1, 0, 0)
                );
            }
        } else {
            if (sesType === 'break') {
                let breakMins = inputBreakTime.getMinutes();
                if (breakMins <= 1) return;
                setInputBreakTime(new Date(0, 0, 0, 0, breakMins - 1, 0, 0));
            } else {
                let sessionMins = inputSessionTime.getMinutes();
                if (sessionMins <= 5) return;
                setInputSessionTime(
                    new Date(0, 0, 0, 0, sessionMins - 1, 0, 0)
                );
            }
        }
    };

    const resetTimer = () => {
        setTimerBreakTime(inputBreakTime);
        setTimerSessionTime(inputSessionTime);
    };

    // change the timer break and session as input break and session changes
    useEffect(() => {
        setTimerBreakTime(inputBreakTime);
        setTimerSessionTime(inputSessionTime);
    }, [inputBreakTime, inputSessionTime]);

    // run timer
    useEffect(() => {
        if (timerState === 'stopped') return;

        const interval = setInterval(() => {
            if (sessionType === 'break') {
                const newTime = new Date(
                    0,
                    0,
                    0,
                    0,
                    timerBreakTime.getMinutes(),
                    timerBreakTime.getSeconds()
                );
                if (newTime.getMinutes() <= 0 && newTime.getSeconds() <= 0) {
                    setSessionType('session');
                    setTimerBreakTime(inputBreakTime);
                    return;
                }
                newTime.setSeconds(newTime.getSeconds() - 1);
                setTimerBreakTime(newTime);
            } else {
                const newTime = new Date(
                    0,
                    0,
                    0,
                    0,
                    timerSessionTime.getMinutes(),
                    timerSessionTime.getSeconds()
                );
                if (newTime.getMinutes() <= 0 && newTime.getSeconds() <= 0) {
                    setSessionType('break');
                    setTimerSessionTime(inputSessionTime);
                } else {
                    newTime.setSeconds(newTime.getSeconds() - 1);
                    setTimerSessionTime(newTime);
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timerBreakTime, timerSessionTime, sessionType, timerState]);

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
                userSelect={'none'}
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
                                ? getTimeString(timerBreakTime)
                                : getTimeString(timerSessionTime)}
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
                            onClick={() =>
                                setTimerState(
                                    timerState === 'started'
                                        ? 'stopped'
                                        : 'started'
                                )
                            }
                        >
                            {timerState === 'started' ? 'Stop' : 'Start'}
                        </GridItem>
                        <GridItem
                            as={'button'}
                            className='action-btn action-btn-reset'
                            onClick={resetTimer}
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
                                <Text>{inputBreakTime.getMinutes()}</Text>
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
                                <Text>{inputSessionTime.getMinutes()}</Text>
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
