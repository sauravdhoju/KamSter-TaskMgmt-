import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import './KanbanBoard.scss';
import NavBar from '../../components/NavBar/NavBar';
import Icon from '../../components/Icon/Icon';

const tabs = ['My List', 'Exam Schedule', 'Test', 'Travelling', 'Add Lists'];

const KanbanBoard = () => {
    const [activeTab, setActiveTab] = useState('My List');//initially render after loading the localhost opens 'my list'

    const renderContent = () => {
        switch (activeTab) {
            case 'My List':
                return (
                    <Box className='kanban-board-workarea'>
                        <Box className='my-list'>
                            <Text className='kanboard-list-heading'>My List</Text>
                            <Box className='icon-container'>
                                <Icon name='bx-shuffle' className='icon' />
                                <Icon name='bx-dots-vertical-rounded' className='icon' />
                            </Box>
                        </Box>
                        <Box className='text-area'>
                            <Icon name='bx-circle' className='small-icon' />
                            <Text className='list-name'>Acessment</Text>
                            <Icon name='bx-star' className='favorite-icon' />
                        </Box>

                        <Box className='text-area'>
                            <Icon name='bx-circle' className='small-icon' />
                            <Text className='list-name'>Acessment</Text>
                            <Icon name='bx-star' className='favorite-icon' />
                        </Box>

                        <Box className='text-area'>
                            <Icon name='bx-circle' className='small-icon' />
                            <Text className='list-name'>Acessment</Text>
                            <Icon name='bx-star' className='favorite-icon' />
                        </Box>

                        <Box className='text-area'>
                            <Icon name='bx-circle' className='small-icon' />
                            <Text className='list-name'>Acessment</Text>
                            <Icon name='bx-star' className='favorite-icon' />
                        </Box>


                        <Box className='task-completed'>
                            <Text className='completed-heading'>Completed</Text>
                            <Icon name = 'bx-chevron-right' className='small-icon'></Icon>
                        </Box>
                    </Box>
                );
            case 'Exam Schedule':
                return (
                    <Box className='kanban-board-workarea'>
                        <Box className='my-list'>
                            <Text className='kanboard-list-heading'>Exam Schedule</Text>
                            <Box className='icon-container'>
                            <Icon name='bx-shuffle' className='icon' />
                                <Icon name='bx-dots-vertical-rounded' className='icon' />
                            </Box>
                        </Box>
                        <Box className='text-area'>
                        <Icon name='bx-circle' className='small-icon' />
                            <Text className='list-name'>Algorithm Analysis Design</Text>
                            <Icon name='bx-star' className='favorite-icon' />
                        </Box>
                    </Box>
                );
            case 'Test':
                return (
                    <Box className='kanban-board-workarea'>
                        <Box className='my-list'>
                            <Text className='kanboard-list-heading'>Test</Text>
                            <Box className='icon-container'>
                            <Icon name='bx-shuffle' className='icon' />
                                <Icon name='bx-dots-vertical-rounded' className='icon' />
                            </Box>
                        </Box>
                        <Box className='text-area'>
                        <Icon name='bx-circle' className='small-icon' />
                            <Text className='list-name'>AAD</Text>
                            <Icon name='bx-star' className='favorite-icon' />
                        </Box>
                    </Box>
                );
            case 'Travelling':
                return (
                    <Box className='kanban-board-workarea'>
                        <Box className='my-list'>
                            <Text className='kanboard-list-heading'>Travelling</Text>
                            <Box className='icon-container'>
                            <Icon name='bx-shuffle' className='icon' />
                                <Icon name='bx-dots-vertical-rounded' className='icon' />
                            </Box>
                        </Box>
                        <Box className='text-area'>
                        <Icon name='bx-circle' className='small-icon' />
                            <Text className='list-name'>Gosaikunda</Text>
                            <Icon name='bx-star' className='favorite-icon' />
                        </Box>
                    </Box>
                );
            case 'Add Lists':
                return (
                    <Box className='kanban-board-workarea'>
                        <Box className='my-list'>
                            <Text className='kanboard-list-heading'>Add Lists</Text>
                            <Box className='icon-container'>
                                <Icon name='bx-plus-circle' className='icon' />
                                <Icon name='bx-dots-vertical-rounded' className='icon' />
                            </Box>
                        </Box>
                        <Box className='text-area'>
                            <Icon name='bx-plus' className='small-icon' />
                            <Text className='list-name'>Create New List</Text>
                            <Icon name='bx-star' className='favorite-icon' />
                        </Box>
                    </Box>
                );
            default:
                return null;
        }
    };

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

                {/* Render the appropriate content based on the selected tab */}
                {renderContent()}

            </Box>
        </Box>
    );
};

export default KanbanBoard;
