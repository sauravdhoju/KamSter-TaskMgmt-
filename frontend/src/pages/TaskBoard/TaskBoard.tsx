import React, { useState } from 'react';
import { Box, Text, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import './TaskBoard.scss';
import NavBar from '../../components/NavBar/NavBar';
import Icon from '../../components/Icon/Icon';

// Define tab names and associated task data
const tabs = ['My List', 'Exam Schedule', 'Test', 'Travelling', 'Add Lists'];

// Define type for tabData and completedTasks to allow string indexing
const tabData: Record<string, string[]> = {
  'My List': ['Assessment 1', 'Assessment 2', 'Assessment 3'],
  'Exam Schedule': ['Algorithm Analysis & Design'],
  'Test': ['AAD'],
  'Travelling': ['Gosaikunda'],
  'Add Lists': [],
  'Completed': [] // Completed tasks
};

interface TaskItemProps {
  item: string; // task name is a string
  isCircleFilled: boolean;
  isFavorite: boolean;
  onIconClick: (task: string) => void; // expects a function that takes a string (task)
  onFavoriteClick: (task: string) => void; // expects a function that takes a string (task)
}

// TaskItem Component
const TaskItem = ({ item, isCircleFilled, isFavorite, onIconClick, onFavoriteClick }: TaskItemProps) => {
  return (
    <Box className="text-area">
      <div onClick={(e) => { e.stopPropagation(); onIconClick(item); }} style={{ display: 'inline-block', cursor: 'pointer' }}>
        <Icon name={isCircleFilled ? 'bxs-circle' : 'bx-circle'} className="small-icon" />
      </div>
      <Text className="list-name" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); onIconClick(item); }}>
        {item}
      </Text>
      <div onClick={(e) => { e.stopPropagation(); onFavoriteClick(item); }} style={{ display: 'inline-block', cursor: 'pointer' }}>
        <Icon name={isFavorite ? 'bxs-star' : 'bx-star'} className="favorite-icon" />
      </div>
    </Box>
  );
};

// Main TaskBoard Component
const TaskBoard = () => {
  const [activeTab, setActiveTab] = useState('My List');
  const [taskState, setTaskState] = useState<Record<string, { isCircleFilled: boolean; isFavorite: boolean }>>({});
  const [starredTasks, setStarredTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Record<string, string[]>>({});
  const [isCompletedOpen, setIsCompletedOpen] = useState<Record<string, boolean>>({});

  // Shuffle the tasks in the current tab
  const shuffleTasks = () => {
    const currentTasks = tabData[activeTab];
    const shuffledTasks = currentTasks.sort(() => Math.random() - 0.5);
    tabData[activeTab] = [...shuffledTasks];
    setTaskState({});
  };

  // Handle icon click to toggle task completion state
  const handleIconClick = (task:string) => {
    setTaskState((prevState) => {
      const isCompleted = !prevState[task]?.isCircleFilled;
  
      // Remove the task from the active tab in tabData if it is marked as completed
      if (isCompleted) {
        tabData[activeTab] = tabData[activeTab].filter((t) => t !== task);
      } else {
        // If the task is marked as incomplete, add it back to tabData for the active tab
        tabData[activeTab].push(task);
      }
  
      // Update the completedTasks state
      const updatedCompletedTasks = isCompleted
        ? [...(completedTasks[activeTab] || []), task]
        : (completedTasks[activeTab] || []).filter((t) => t !== task);
  
      setCompletedTasks((prevState) => ({
        ...prevState,
        [activeTab]: updatedCompletedTasks,
      }));
  
      return {
        ...prevState,
        [task]: { ...prevState[task], isCircleFilled: isCompleted },
      };
    });
  };
  

  // Handle favorite click to toggle task star status
  const handleFavoriteClick = (task: string) => {
    setTaskState((prevState) => {
      const isFavorite = !prevState[task]?.isFavorite;
      const updatedStarredTasks = isFavorite
        ? [...starredTasks, task]
        : starredTasks.filter((t) => t !== task);

      setStarredTasks(updatedStarredTasks);

      return {
        ...prevState,
        [task]: { ...prevState[task], isFavorite },
      };
    });
  };

  // Toggle completed tasks dropdown
  const toggleCompleted = () => {
    setIsCompletedOpen((prevState) => ({
      ...prevState,
      [activeTab]: !prevState[activeTab],
    }));
  };

  // Render individual task items
  const renderListItems = (items: string[]) => (
    <>
      {items.map((item, index) => (
        <TaskItem
          key={index}
          item={item}
          isCircleFilled={taskState[item]?.isCircleFilled || false}
          isFavorite={taskState[item]?.isFavorite || false}
          onIconClick={handleIconClick}
          onFavoriteClick={handleFavoriteClick}
        />
      ))}
    </>
  );

  // Render completed tasks section
  const renderCompletedTasks = () => {
    const completedCount = (completedTasks[activeTab] || []).length;

    return (
      <Box className="task-completed">
        <Text className="completed-heading" onClick={toggleCompleted} style={{ cursor: 'pointer' }}>
          Completed ({completedCount})
          <Icon name={isCompletedOpen[activeTab] ? "bx-chevron-down" : "bx-chevron-right"} />
        </Text>
        {isCompletedOpen[activeTab] && (
          <Box className="completed-dropdown">
            {completedCount === 0 ? (
              <Text>No tasks completed yet in this tab.</Text>
            ) : (
              completedTasks[activeTab].map((task, index) => (
                <Box key={index} className="completed-task-item">
                  <Icon name="bx-check" className="completed-icon" style={{ marginRight: '8px' }} />
                  <Text className="completed-text">{task}</Text>
                </Box>
              ))
            )}
          </Box>
        )}
      </Box>
    );
  };

  // Render main content based on active tab
  const renderContent = () => (
    <Box className="task-board-workarea">
      <Box className="my-list">
        <Text className="task-list-heading">{activeTab}</Text>
        <Box className="icon-container">
          <Icon name="bx-shuffle" className="icon" onClick={shuffleTasks} />
          <Menu>
            <MenuButton>
              <Icon name="bx-dots-vertical-rounded" className="icon" />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => alert('Add Task functionality')}>Add Task</MenuItem>
              <MenuItem onClick={() => alert('Edit Task functionality')}>Edit Task</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
      {renderListItems(tabData[activeTab])}
      {renderCompletedTasks()}
    </Box>
  );

  return (
    <Box className="task-board">
      <NavBar />
      <Text className="task-board-heading">Tasks</Text>

      <Box className="task-board-list">
        <Box
          className={`tab-item star-tab ${activeTab === 'star' ? 'active' : ''}`}
          onClick={() => setActiveTab('star')}
        >
          <Icon name="bxs-star" className="icon" />
        </Box>

        {tabs.map((tab) => (
          <Box
            key={tab}
            className={`tab-item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Box>
        ))}
      </Box>

      {renderContent()}
    </Box>
  );
};

export default TaskBoard;
