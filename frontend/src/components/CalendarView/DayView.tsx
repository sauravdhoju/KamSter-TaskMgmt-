import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import './DayView.scss';
type DayView = {
    viewDay: string;
};
const DayView = ({ viewDay }: DayView) => {
    return (
        <Grid
            bgColor={'#D9D9D9'}
            gridTemplateColumns={'1fr'}
            gridTemplateRows={'min-content 1fr'}
            gap={'5px'}
            className='day-view'
            height={'100%'}
        >
            <GridItem
                className='day-name-date'
                width={'100%'}
                textAlign={'center'}
                paddingY={'20px'}
            >
                <Text>{viewDay}</Text>
            </GridItem>
            <GridItem
                className='day-timestamp-container'
                bgColor={'#e5e5e5'}
                // bgColor={'yellow'}
                height={'100%'}
                maxH={'100%'}
                overflowY={'scroll'}
            >
                {Array.from({ length: 12 }, (_, i) => {
                    if (i === 0) {
                        return (
                            <Box
                                className='day-timestamp-block'
                                borderBottom={'1px solid #0000007f'}
                                height={'50px'}
                            >
                                <Text className='timestamp-block-hour'></Text>
                            </Box>
                        );
                    }
                    return (
                        <Box
                            className='day-timestamp-block'
                            borderBottom={'1px solid #0000007f'}
                            height={'50px'}
                        >
                            <Text className='timestamp-block-hour'>{`${
                                i < 10 ? '0' + i : i
                            }:00 AM`}</Text>
                        </Box>
                    );
                })}
                {Array.from({ length: 12 }, (_, i) => {
                    if (i === 0) {
                        return (
                            <Box
                                className='day-timestamp-block'
                                borderBottom={'1px solid #0000007f'}
                                height={'50px'}
                            >
                                <Text className='timestamp-block-hour'>{`12:00 PM`}</Text>
                            </Box>
                        );
                    }
                    return (
                        <Box
                            className='day-timestamp-block'
                            borderBottom={'1px solid #0000007f'}
                            height={'50px'}
                        >
                            <Text className='timestamp-block-hour'>{`${
                                i < 10 ? '0' + i : i
                            }:00 PM`}</Text>
                        </Box>
                    );
                })}
            </GridItem>
        </Grid>
    );
};

export default DayView;
