import React, { useEffect } from 'react';
import './Sidebar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';
import Icon from '../Icon/Icon';
import { useBackendAPIContext } from '../../contexts/BackendAPIContext/BackendAPIContext';
import { useUserContext } from '../../contexts/UserContext/UserContext';

type TaskList = {
    _id: string;
    task_list_name: string;
    user_id: string;
    isInitialList: boolean;
    created_at: Date;
    updated_at: Date;
};

type SidebarTypes = {
    isSideBarOpen: boolean;
    setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ isSideBarOpen, setIsSideBarOpen }: SidebarTypes) => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { client } = useBackendAPIContext();
    const { user } = useUserContext();
    const [taskListNames, setTaskListNames] = useState<string[]>([]);

    const toggleSidebar = () => {
        setIsSideBarOpen(!isSideBarOpen);
    };

    // const userEmail = 'jinaa@gmail.com';
    const isUserLoggedIn = true;

    const sidebarLinks = [
        {
            name: 'home',
            icon: 'bx-home-alt-2',
        },
        {
            name: 'tasks',
            icon: 'bx-task',
        },
        {
            name: 'calendar',
            icon: 'bx-calendar',
        },
        {
            name: 'kanban',
            icon: 'bx-grid',
        },
        {
            name: 'pomodoro',
            icon: 'bx-chalkboard',
        },
    ];

    const fetchTaskLists = async () => {
        try {
            const response = await client.get('/task-lists/get');
            const data = await response.data;
            if (!data) throw new Error("Didn't get any data");
            const taskLists: TaskList[] = data.taskLists;
            const taskListNames: string[] = taskLists.map(
                (taskList) => taskList.task_list_name
            );
            setTaskListNames(taskListNames);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTaskLists();
    }, []);

    return (
        <Box className={`sidebar ${isSideBarOpen ? 'open' : 'collapsed'}`}>
            {/* Toggle Button */}
            <Box
                className={`toggle-btn ${isSideBarOpen ? '' : 'collapsed'}`}
                onClick={toggleSidebar}
            >
                <Icon name={'bx-chevron-left'} className='sidebar-close-icon' />
            </Box>
            <Box
                className={`menu-toggle-btn ${
                    isSideBarOpen ? '' : 'menu-toggle-btn-collapsed'
                }`}
                onClick={toggleSidebar}
            >
                <Icon name={'bx-menu'} className='sidebar-menu-icon' />
            </Box>

            {/* Profile Section */}
            <Flex
                flexDir={'column'}
                gap={'10px'}
                className={`profile-container ${
                    isSideBarOpen ? '' : 'profile-container-minimized'
                }`}
                onClick={() => navigate('/my-profile')}
            >
                <Box
                    className={`profile-btn ${
                        isSideBarOpen ? '' : 'profile-btn-minimized'
                    }`}
                >
                    {isUserLoggedIn ? (
                        <Image
                            src='/simpmom.jpg'
                            alt='simpmom'
                            objectFit={'cover'}
                            width={'100%'}
                            height={'100%'}
                        />
                    ) : (
                        <Icon name='bx-user' className='profile-icon' />
                    )}
                </Box>
                <p
                    className={`user-email ${
                        isSideBarOpen ? '' : 'bar-item-collapsed'
                    }`}
                >
                    {user?.email || 'Loading...'}
                </p>
            </Flex>

            {/* Icons*/}
            <Box
                className={`icons-container ${
                    isSideBarOpen ? '' : 'icons-container-collapsed'
                }`}
            >
                {sidebarLinks.map((link, index) => {
                    if (link.name === 'home') {
                        return (
                            <Link to={`/`} key={index} className='sidebar-link'>
                                <Icon
                                    name={link.icon}
                                    className='sidebar-icon'
                                />
                                <span>{link.name}</span>
                            </Link>
                        );
                    }
                    return (
                        <Link
                            to={`/${link.name}`}
                            key={index}
                            className='sidebar-link'
                        >
                            <Icon name={link.icon} className='sidebar-icon' />
                            <span>{link.name}</span>
                        </Link>
                    );
                })}
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
                <Box width={'100%'} className='my-lists-container'>
                    <Flex
                        // alignItems='center'
                        className='list-heading'
                        onClick={() =>
                            isSideBarOpen
                                ? setIsDropdownOpen(!isDropdownOpen)
                                : navigate('/tasks')
                        } // Toggle dropdown
                    >
                        <Flex alignItems='center'>
                            <Icon name='bx-list-ul' className='sidebar-icon' />
                            <span>Lists</span>
                        </Flex>
                        <Icon
                            name={
                                isDropdownOpen
                                    ? 'bx-caret-down'
                                    : 'bx-caret-right'
                            }
                            className='drop-icon'
                        />
                    </Flex>

                    {isDropdownOpen && (
                        <Box className='dropdown-list'>
                            {taskListNames.map((taskListName, index) => (
                                <Link
                                    to={`/tasks?task-list-name=${taskListName}`}
                                    key={index}
                                >
                                    <Icon
                                        name='bx-checkbox-checked'
                                        className='sidebar-icon'
                                    />
                                    <span>{taskListName}</span>
                                </Link>
                            ))}
                        </Box>
                    )}
                </Box>
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
            <Box
                className={`logout-container ${
                    isSideBarOpen ? '' : 'logout-container-collapsed'
                }`}
                mt={'auto'}
            >
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
