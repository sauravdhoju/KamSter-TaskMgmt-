import { Box, Flex, Grid } from '@chakra-ui/react';

import HeaderGreet from '../../components/HeaderGreet/HeaderGreet';

import './Pomodoro.scss';

const Pomodoro = () => {
    return (
        <Flex
            className='pomodoro-page'
            width={'100%'}
            height={'100vh'}
            minH={'100vh'}
            flexDir={'row'}
        >
            <Grid
                className='pomodoro-container'
                width={'100%'}
                height={'100%'}
                justifyContent={'flex-start'}
                alignItems={'center'}
                flexDir={'column'}
                bgColor={'yellow'}
                // templateRows={'repeat(2, 1fr)'}
                templateColumns={'1fr'}
                templateRows={'min-content 1fr'}
            >
                <HeaderGreet />
                <Box
                    className='pomodoro-timer'
                    width={'25%'}
                    minW={'25px'}
                    height={'25%'}
                    minH={'25px'}
                    bgColor={'red'}
                    justifySelf={'center'}
                    marginBottom={'85px'}
                ></Box>
            </Grid>
        </Flex>
    );
};

export default Pomodoro;
