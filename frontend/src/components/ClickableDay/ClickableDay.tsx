import { GridItem, Text } from '@chakra-ui/react';

import './ClickableDay.scss';

type ClickableDayType = {
    associatedDate: Date;
};

const ClickableDay = ({ associatedDate }: ClickableDayType) => {
    const months3L = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    const dayDate = associatedDate.getDate();
    return (
        <GridItem
            p='10px'
            display={'flex'}
            justifyContent={'center'}
            bgColor={'#E5E5E5'}
        >
            <Text>
                {dayDate === 1 && months3L[associatedDate.getMonth()]} {dayDate}
            </Text>
        </GridItem>
    );
};

export default ClickableDay;
