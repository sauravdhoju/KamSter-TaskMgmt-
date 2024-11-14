import { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';

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
            flexDir={'row'}
        >
            <Sidebar
                isSideBarOpen={isSidebarOpen}
                setIsSideBarOpen={setIsSidebarOpen}
            />
            <Box
                className='page-content-container'
                minH={'100%'}
                flexGrow={1}
                paddingX={'20px'}
                display={'flex'}
                flexDir={'column'}
            >
                <HeaderRenderer
                    isSideBarOpen={isSidebarOpen}
                    setIsSideBarOpen={setIsSidebarOpen}
                />
                {children}
            </Box>
        </Flex>
    );
};

export default PageContainer;
