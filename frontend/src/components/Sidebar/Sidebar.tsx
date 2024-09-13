import React from 'react';
import './Sidebar.scss';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading } from '@chakra-ui/react';
import 'Boxicons/css/Boxicons.min.css';
import Icon from '../Icon/Icon';

type SidebarTypes = {
    isSideBarOpen: boolean;
    setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ isSideBarOpen, setIsSideBarOpen }: SidebarTypes) => {
    const toggleSidebar = () => {
        setIsSideBarOpen(!isSideBarOpen);
    };

    const userEmail = 'jinaa@gmail.com';
    const isUserLoggedIn = true;

    return (
        <Box className={`sidebar ${isSideBarOpen ? 'open' : 'collapsed'}`}>
            {/* Toggle Button */}
            <Box className='toggle-btn' onClick={toggleSidebar}>
                <Icon name={'bx-chevron-left'} className='sidebar-close-icon' />
            </Box>

            {/* Profile Section */}
            <Flex flexDir={'column'} gap={'10px'} className='profile-container'>
                <Box className='profile-btn'>
                    {isUserLoggedIn ? (
                        <i className='bx bxs-user sidebar-icon'></i>
                    ) : (
                        <i className='bx bx-user sidebar-icon'></i>
                    )}
                </Box>
                <p className='user-email'>{userEmail}</p>
            </Flex>

            {/* Icons*/}
            <Box className='icons-container'>
                <Link to='/home'>
                    <Icon name='bx-home' className='sidebar-icon' />
                    <span>Home</span>
                </Link>
                <Link to='/calendar'>
                    <Icon name='bx-calendar' className='sidebar-icon' />

                    <span>Calendar</span>
                </Link>
                <Link to='/kanban'>
                    <Icon name='bx-grid' className='sidebar-icon' />
                    <span>Kanban</span>
                </Link>
            </Box>

            {/* Menu List */}
            <Box className='menu-list'>
                <Box className='menu-heading'>
                    <Box className='border'></Box>
                    <Heading className='menu-heading-text' as={'h2'}>
                        My List
                    </Heading>
                    <Box className='border'></Box>
                </Box>
                <p>My Task</p>
                <p>College Stuffs</p>
            </Box>
        </Box>
    );
};

export default Sidebar;
