import React from 'react';
import './Sidebar.scss';
import { Link } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import 'boxicons/css/boxicons.min.css';

type SidebarTypes = {
    isSideBarOpen: boolean;
    setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ isSideBarOpen, setIsSideBarOpen }: SidebarTypes) => {
    const toggleSidebar = () => {
        setIsSideBarOpen(!isSideBarOpen);
    };

    const userEmail = 'jina@gmail.com';
    const isUserLoggedIn = true;

    return (
        <div className={`sidebar ${isSideBarOpen ? 'open' : 'collapsed'}`}>
            {/* Toggle Button */}
            <div className='toggle-btn' onClick={toggleSidebar}>
                <i
                    className={`bx ${
                        isSideBarOpen ? 'bx-chevron-right' : 'bx-chevron-left'
                    }`}
                ></i>
            </div>

            {/* Profile Section */}
            <Box className='profile-btn'>
                {isUserLoggedIn ? (
                    <i className='bx bxs-user sidebar-icon'></i>
                ) : (
                    <i className='bx bx-user sidebar-icon'></i>
                )}
            </Box>
            {isSideBarOpen && <p className='user-email'>{userEmail}</p>}

            {/* Icons*/}
            <div className='icons-container'>
                <Link to='/home'>
                    <i className='bx bx-home sidebar-icon'></i>
                    {isSideBarOpen && <span>Home</span>}
                </Link>
                <Link to='/calendar'>
                    <i className='bx bx-calendar sidebar-icon'></i>
                    {isSideBarOpen && <span>Calendar</span>}
                </Link>
                <Link to='/kanban'>
                    <i className='bx bx-grid sidebar-icon'></i>
                    {isSideBarOpen && <span>Kanban</span>}
                </Link>
            </div>

            {/* Menu List */}
            {isSideBarOpen && (
                <div className='menu-list'>
                    <h3 className='menu-heading'>My List</h3>
                    <p>My Task</p>
                    <p>College Stuffs</p>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
