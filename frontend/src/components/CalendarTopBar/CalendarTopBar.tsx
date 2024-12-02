import { Link as ReactRouterLink } from 'react-router-dom';
import {
    Box,
    Grid,
    GridItem,
    Link as ChakraLink,
    Text,
    TabList,
    Tab,
    Tabs,
} from '@chakra-ui/react';

import Icon from '../Icon/Icon';

import { useCalendarContext } from '../../contexts/CalendarContext/CalendarContext';

import './CalendarTopBar.scss';

const CalendarTopBar = () => {
    const {
        currentView,
        setCurrentView,
        setCurrentViewDate,
        getCalendarTopBarDateString,
        today,
    } = useCalendarContext();

    const handleDateIncreaseDecrease = (
        actionType: 'increase' | 'decrease'
    ) => {
        setCurrentViewDate((prevState) => {
            const newState = new Date(prevState);

            if (actionType === 'increase') {
                newState.setDate(newState.getDate() + 1);
            } else {
                newState.setDate(newState.getDate() - 1);
            }

            return newState;
        });
    };

    return (
        <Grid
            width={'100%'}
            templateColumns={'1fr 1fr 1fr'}
            className='calendar-header-grid'
        >
            <GridItem display={'flex'} alignItems={'center'}>
                <ChakraLink
                    as={ReactRouterLink}
                    display={'inline-block'}
                    border={'1px solid black'}
                    borderRadius={'25px'}
                    fontSize={'16px'}
                    padding={'3px 16px'}
                    fontWeight={400}
                    _hover={{
                        textDecoration: 'none',
                        cursor: 'pointer',
                    }}
                    _active={{
                        textDecoration: 'none',
                        bgColor: '#3a3838',
                        color: 'white',
                    }}
                    onClick={() => setCurrentViewDate(today)}
                >
                    Today
                </ChakraLink>
            </GridItem>
            <GridItem
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={'20px'}
            >
                <Box
                    alignItems={'center'}
                    display={'flex'}
                    justifyContent={'center'}
                    border={'1px solid black'}
                    rounded={'100%'}
                    width={'30px'}
                    height={'30px'}
                    _hover={{
                        cursor: 'pointer',
                    }}
                    _active={{
                        textDecoration: 'none',
                        bgColor: '#3a3838',
                        color: 'white',
                    }}
                    onClick={() => handleDateIncreaseDecrease('decrease')}
                >
                    <Icon
                        name='bxs-chevron-left'
                        className='move-date-rage-left-icon'
                    />
                </Box>
                <Text fontSize={'16px'} minWidth={'max-content'}>
                    {getCalendarTopBarDateString()}
                </Text>
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    border={'1px solid black'}
                    rounded={'100%'}
                    width={'30px'}
                    height={'30px'}
                    _hover={{
                        cursor: 'pointer',
                    }}
                    _active={{
                        textDecoration: 'none',
                        bgColor: '#3a3838',
                        color: 'white',
                    }}
                    onClick={() => handleDateIncreaseDecrease('increase')}
                >
                    <Icon
                        name='bxs-chevron-right'
                        className='move-date-rage-right-icon'
                    />
                </Box>
            </GridItem>
            <GridItem
                display={'flex'}
                justifyContent={'flex-end'}
                alignItems={'center'}
            >
                <Tabs
                    variant={'unstyled'}
                    className='calendar-toggle-tabs-container'
                    defaultIndex={(() => {
                        const validViews = ['year', 'month', 'week', 'day'];
                        return validViews.indexOf(currentView);
                    })()}
                    onChange={(index) =>
                        setCurrentView(() => {
                            const validViews = [
                                'year',
                                'month',
                                'week',
                                'day',
                            ] as const;
                            return validViews[index];
                        })
                    }
                >
                    <TabList className='calendar-toggle' bgColor={'blue'}>
                        <Tab className='calendar-toggle-button' value={'year'}>
                            Year
                        </Tab>
                        <Tab className='calendar-toggle-button' value={'month'}>
                            Month
                        </Tab>
                        <Tab className='calendar-toggle-button' value={'week'}>
                            Week
                        </Tab>
                        <Tab className='calendar-toggle-button' value={'day'}>
                            Day
                        </Tab>
                    </TabList>
                </Tabs>
            </GridItem>
        </Grid>
    );
};

export default CalendarTopBar;
