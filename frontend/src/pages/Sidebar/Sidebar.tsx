import React, { useState } from 'react';
import './Sidebar.scss';
import { Link } from 'react-router-dom'; 
import { Box } from '@chakra-ui/react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'; 
import 'boxicons/css/boxicons.min.css';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const userEmail = 'jina@gmail.com'; 
  const isUserLoggedIn = true; 

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      {/* Toggle Button */}
      <div className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <AiOutlineLeft /> : <AiOutlineRight />}
      </div>

      {/* Profile Section */}
      <Box className='profile-btn'>
        {isUserLoggedIn ? (
          <i className='bx bxs-user sidebar-icon'></i> 
        ) : (
          <i className='bx bx-user sidebar-icon'></i> 
        )}
      </Box>
      {isOpen && <p className="user-email">{userEmail}</p>}

      {/* Icons*/}
      <div className="icons-container">
        <Link to="/home">
          <i className='bx bx-home sidebar-icon'></i>
          {isOpen && <span>Home</span>}
        </Link>
        <Link to="/calendar">
          <i className='bx bx-calendar sidebar-icon'></i>
          {isOpen && <span>Calendar</span>}
        </Link>
        <Link to="/kanban">
          <i className='bx bx-grid sidebar-icon'></i>
          {isOpen && <span>Kanban</span>}
        </Link>
      </div>

      {/* Menu List */}
      {isOpen && (
        <div className="menu-list">
          <h3 className="menu-heading">My List</h3>
          <p>My Task</p>
          <p>College Stuffs</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
