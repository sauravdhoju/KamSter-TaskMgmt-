import React, { useState } from 'react';
import './Sidebar.scss';  
import { BiUser, BiSolidUser } from 'react-icons/bi';
import { Box, Heading } from '@chakra-ui/react';
import 'boxicons/css/boxicons.min.css';

const Sidebar: React.FC = () => {
  // const [isOpen, setIsOpen] = useState<boolean>(true);

  // const toggleSidebar = () => {
  //   setIsOpen(!isOpen);
  // };
  
  const userEmail = 'user@example.com'; 
  const isUserLoggedIn = true;

  return (
    <div className="sidebar">
    
      <Box className='profile-btn'>
        {isUserLoggedIn ? (
            <BiSolidUser className='sidebar-icon' />) : (
                    <BiUser className='sidebar-icon' />
                )}
            </Box>  
      <p className="user-email">{userEmail}</p>

     <div className="icons-container">
        <i className='bx bx-grid sidebar-icon'></i>
        <i className='bx bx-calendar sidebar-icon'></i>
        <i className='bx bx-home-alt-2 sidebar-icon'></i>
      </div>
    </div>
  );
};

export default Sidebar;
{/* <box-icon name='grid' ></box-icon> */}

