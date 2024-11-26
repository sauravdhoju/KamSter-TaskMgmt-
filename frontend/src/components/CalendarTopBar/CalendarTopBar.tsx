import { Link as ReactRouterLink } from 'react-router-dom';
import {
    Grid,
    GridItem,
    Link as ChakraLink,
    Text,
    TabList,
    Tab,
    Tabs,
} from '@chakra-ui/react';

import Icon from '../Icon/Icon';

import './CalendarTopBar.scss';

const CalendarTopBar = () => {
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
                        bgColor: '#3a3838',
                        color: 'white',
                    }}
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
                <ChakraLink
                    as={ReactRouterLink}
                    alignItems={'center'}
                    display={'flex'}
                    justifyContent={'center'}
                    border={'1px solid black'}
                    rounded={'100%'}
                    width={'30px'}
                    height={'30px'}
                    _hover={{
                        textDecoration: 'none',
                        bgColor: '#3a3838',
                        color: 'white',
                    }}
                >
                    <Icon
                        name='bxs-chevron-left'
                        className='move-date-rage-left-icon'
                    />
                </ChakraLink>
                <Text fontSize={'16px'}>2024</Text>
                <ChakraLink
                    as={ReactRouterLink}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    border={'1px solid black'}
                    rounded={'100%'}
                    width={'30px'}
                    height={'30px'}
                    _hover={{
                        textDecoration: 'none',
                        bgColor: '#3a3838',
                        color: 'white',
                    }}
                >
                    <Icon
                        name='bxs-chevron-right'
                        className='move-date-rage-right-icon'
                    />
                </ChakraLink>
            </GridItem>
            <GridItem
                display={'flex'}
                justifyContent={'flex-end'}
                alignItems={'center'}
            >
                <Tabs
                    variant={'unstyled'}
                    className='calendar-toggle-tabs-container'
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
