import { useState } from 'react';
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';

import Sidebar from '../Sidebar/Sidebar';
import HeaderRenderer from '../HeaderRenderer/HeaderRenderer';

const PageContainer: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <Flex
            className='page-container'
            width={'100%'}
            height={'100vh'}
            minH={'100vh'}
            maxH={'100vh'}
            flexDir={'row'}
        >
            <Sidebar
                isSideBarOpen={isSidebarOpen}
                setIsSideBarOpen={setIsSidebarOpen}
            />
            <Grid
                className='page-content-container'
                width={'100%'}
                maxW={'1920px'}
                minH={'100%'}
                flexGrow={1}
                maxH={'100%'}
                paddingX={'20px'}
                gridTemplateColumns={'1fr'}
                gridTemplateRows={'min-content 1fr'}
            >
                <GridItem>
                    <HeaderRenderer
                        isSideBarOpen={isSidebarOpen}
                        setIsSideBarOpen={setIsSidebarOpen}
                    />
                </GridItem>
                <GridItem maxH={'100%'} overflowY={'auto'}>
                    {children}
                </GridItem>
            </Grid>
        </Flex>
    );
};

export default PageContainer;
