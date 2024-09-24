import React from 'react';
import './Sidebar.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import 'Boxicons/css/Boxicons.min.css';
import Icon from '../Icon/Icon';

type SidebarTypes = {
    isSideBarOpen: boolean;
    setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ isSideBarOpen, setIsSideBarOpen }: SidebarTypes) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
                    <Icon name='bx-home-alt-2' className='sidebar-icon' />
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
                <Link to='/pomodoro'>
                    <Icon name='bx-chalkboard' className='sidebar-icon' />
                    <span>Pomodoro</span>
                </Link>
                <Box
                    as={Link}
                    to='/newlist'
                    w={'100%'}
                    display='flex'
                    alignItems='center'
                    className='new-list-button'
                >
                    <Icon name='bx-list-plus' className='sidebar-icon' />
                    <span>New List</span>
                </Box>
                <Flex
                    // alignItems='center'

                    className='list-heading'
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
                >
                    <Flex alignItems='center'>
                        <Icon name='bx-check-square' className='sidebar-icon' />
                        <span>Lists</span>
                    </Flex>
                    <Icon
                        name={
                            isDropdownOpen ? 'bx-caret-down' : 'bx-caret-right'
                        }
                        className='drop-icon'
                    />
                </Flex>

                {isDropdownOpen && (
                    <Box className='dropdown-list'>
                        <Link to='/list1'>List 1</Link>
                        <Link to='/list2'>List 2</Link>
                        <Link to='/list2'>List 2</Link>
                        <Link to='/list2'>List 2</Link>
                        <Link to='/list2'>List 2</Link>
                        <Link to='/list2'>List 2</Link>
                        <Link to='/list2'>List 2</Link>
                        <Link to='/list2'>List 2</Link>
                        <Link to='/list2'>List 2</Link>
                        <Link to='/list2'>List 2</Link>
                        <Link to='/list2'>List 2</Link>
                    </Box>
                )}
            </Box>

            {/* Menu List */}
            {/* <Box className='menu-list'> */}
            {/* <Box className='menu-heading'>
                    <Box className='border'></Box>
                    <Heading className='menu-heading-text' as={'h2'}>
                        My List
                    </Heading>
                    <Box className='border'></Box>
                </Box> */}
            {/* <p>My Task</p>
                <p>College Stuffs</p> */}
            {/* </Box> */}

            {/* logout */}
            <Box className='logout-container' mt={'auto'}>
                <Link to='/login' className='logout-link'>
                    <Flex
                        as='button'
                        alignItems={'center'}
                        justifyContent={'flex-start'}
                        w={'100%'}
                        p={2}
                        borderRadius={'md'}
                        backgroundColor={'transparent'}
                        borderWidth={1}
                        borderColor={'white'}
                        className='logout-btn'
                    >
                        <Icon name='bx-log-out' className='sidebar-icon' />
                        <span> Logout</span>
                    </Flex>
                </Link>
            </Box>
        </Box>
    );
};

export default Sidebar;
