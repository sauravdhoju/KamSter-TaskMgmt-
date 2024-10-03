import { Box, Flex, Image, Heading, Text } from '@chakra-ui/react';
import Icon from '../Icon/Icon';
import './HeaderGreet.scss';
const HeaderGreet = () => {
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
                            It's Monday, 19 August 2024
                        </Text>
                    </Flex>
                    <Icon name='bx-sun' />
                </Flex>
            </Flex>
            <Flex gap={'10px'} className='times-container'>
                <Text>01:15:55 AM</Text>
                <Icon name='bxs-cog' />
                <Icon name='bx-user' />
            </Flex>
        </Flex>
    );
};

export default HeaderGreet;
