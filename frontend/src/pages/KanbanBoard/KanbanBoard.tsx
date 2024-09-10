import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import './KanbanBoard.scss';
import NavBar from '../../components/NavBar/NavBar';
import Icon from '../../components/Icon/Icon';

const tabs = ['My List', 'Exam Schedule', 'Test', 'Travelling', 'Add Lists'];

const KanbanBoard = () => {
    const [activeTab, setActiveTab] = useState('My List');
    return (
        <Box>
            <Box className='kanban-board'>
                <NavBar />
                <Text className='kanban-board-heading'>Tasks</Text>

                <Box className='kanban-board-list'>
                    {/* Separate tab for the star icon */}
                    <Box
                        className={`tab-item star-tab ${activeTab === 'star' ? 'active' : ''}`}
                        onClick={() => setActiveTab('star')}
                    >
                        <Icon name='bxs-star' className='icon' />
                    </Box>


                    {/* Other tabs */}
                    {tabs.map((tab, index) => (
                        <Box
                            key={index}
                            className={`tab-item ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            <Text className='kanban-my-list'>{tab}</Text>
                        </Box>
                    ))}
                </Box>

                <Box className='kanban-board-workarea'>
                    <Box className='my-list'>
                        <Text className='kanboard-list-heading'>My List</Text>
                        <Box className='icon-container'>
                            <Icon name='bx-shuffle' className='icon'/>
                            <Icon name='bx-dots-vertical-rounded' className='icon' />
                        </Box>
                    </Box>
                    <Box className='text-area'>
                        <Icon name='bx-circle' className='icon'/>
                    </Box>
                </Box>

            </Box>
        </Box>
    );
};

export default KanbanBoard;
