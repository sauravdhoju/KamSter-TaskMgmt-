import { useState, useEffect } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
    Link as ChakraLink,
    Flex,
    Image,
    Heading,
    Text,
} from '@chakra-ui/react';
import Icon from '../Icon/Icon';
import './HeaderGreet.scss';

const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const HeaderGreet = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const getTimeString = () => {
        let hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();

        if (hours > 12) hours = hours - 12;
        const timeStr = `${hours < 10 ? '0' + hours : hours}:${
            minutes < 10 ? '0' + minutes : minutes
        }:${seconds < 10 ? '0' + seconds : seconds}`;
        return timeStr;
    };
    const [timeString, setTimeString] = useState(getTimeString());
    const [meridiemType, setMeridiemType] = useState<'ante' | 'post'>(
        currentTime.getHours() > 12 ? 'post' : 'ante'
    );
    const [dateString, setDateString] = useState(
        `${days[currentTime.getDay() - 1]}, ${currentTime.getDate()} ${
            months[currentTime.getMonth() - 1]
        } ${currentTime.getFullYear()}`
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
            setTimeString(getTimeString());
            setMeridiemType(currentTime.getHours() > 12 ? 'post' : 'ante');
            setDateString(
                `${days[currentTime.getDay() - 1]}, ${currentTime.getDate()} ${
                    months[currentTime.getMonth() - 1]
                } ${currentTime.getFullYear()}`
            );
        }, 1000);
        return () => clearInterval(interval);
    }, [currentTime]);

    return (
        <Flex
            justifySelf={'flex-start'}
            justifyContent={'space-between'}
            alignItems={'center'}
            width={'100%'}
            padding={'30px 25px 0 25px'}
            className='header-greet'
            flexWrap={'wrap'}
            gap={'10px'}
        >
            <Flex
                alignItems={'center'}
                gap={'10px'}
                className='header-container'
            >
                <Image
                    src='/ghost.jpg'
                    width={'55px'}
                    minW={'40px'}
                    minH={'40px'}
                    maxH={'55px'}
                    aspectRatio={'1 / 1'}
                    borderRadius={'50%'}
                />
                <Flex gap={'5px'} className='greet-container'>
                    <Flex
                        flexDir={'column'}
                        alignItems={'flex-end'}
                        className='greet-texts'
                    >
                        <Heading
                            as={'h5'}
                            size={'md'}
                            display={'inline-flex'}
                            alignItems={'center'}
                            gap={'5px'}
                            className='greet-header'
                        >
                            Good Morning, Saurav!!
                        </Heading>
                        <Text fontWeight={300} fontSize={'16px'}>
                            It's {dateString}
                        </Text>
                    </Flex>
                    <Icon
                        name={
                            currentTime.getHours() > 17 ||
                            currentTime.getHours() < 5
                                ? 'bx-moon'
                                : 'bx-sun'
                        }
                    />
                </Flex>
            </Flex>
            <Flex gap={'10px'} className='times-container'>
                <Text>
                    {timeString} {meridiemType === 'ante' ? 'AM' : 'PM'}
                </Text>
                <ChakraLink
                    as={ReactRouterLink}
                    to='/my-account'
                    cursor={'pointer'}
                >
                    <Icon name='bx-user' />
                </ChakraLink>
            </Flex>
        </Flex>
    );
};

export default HeaderGreet;
