import { Box, Heading } from '@chakra-ui/react';
import { BsFillGridFill } from 'react-icons/bs';
import { BiUser, BiSolidUser } from 'react-icons/bi';

import './NavBar.scss';

type NavBarType = {
    isSideBarOpen: boolean;
    setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavBar = ({ isSideBarOpen, setIsSideBarOpen }: NavBarType) => {
    const isUserLoggedIn = true;

    return (
        <Box className='nav-bar-container'>
            <Box
                className='menu-toggler'
                onClick={() => setIsSideBarOpen(!isSideBarOpen)}
            >
                <BsFillGridFill className='menu-icon' />
            </Box>
            <Heading className='site-name' as={'h1'}>
                KamSter
            </Heading>
            <Box className='profile-btn'>
                {isUserLoggedIn ? (
                    <BiSolidUser className='profile-btn-icon' />
                ) : (
                    <BiUser className='profile-btn-icon' />
                )}
            </Box>
        </Box>
    );
};

export default NavBar;
