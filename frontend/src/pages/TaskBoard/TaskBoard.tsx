import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import './TaskBoard.scss';
import NavBar from '../../components/NavBar/NavBar';
import Icon from '../../components/Icon/Icon';

const tabs = ['My List', 'Exam Schedule', 'Test', 'Travelling', 'Add Lists'];

const tabData = {
  'My List': ['Assessment 1', 'Assessment 2', 'Assessment 3'],
  'Exam Schedule': ['Algorithm Analysis & Design'],
  'Test': ['AAD'],
  'Travelling': ['Gosaikunda'],
  'Add Lists': ['Create New List']
};

const TaskItem = ({ item, isCircleFilled, isFavorite, onIconClick, onFavoriteClick }) => {
  const handleIconClick = (e) => {
    e.stopPropagation();
    onIconClick(item);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onFavoriteClick(item);
  };

  return (
    <Box className="text-area">
      <div onClick={handleIconClick} style={{ display: 'inline-block', cursor: 'pointer' }}>
        <Icon
          name={isCircleFilled ? 'bxs-circle' : 'bx-circle'}
          className="small-icon"
        />
      </div>
      <Text
        className="list-name"
        style={{ cursor: 'pointer' }}
        onClick={handleIconClick}
      >
        {item}
      </Text>
      <div onClick={handleFavoriteClick} style={{ display: 'inline-block', cursor: 'pointer' }}>
        <Icon
          name={isFavorite ? 'bxs-star' : 'bx-star'}
          className="favorite-icon"
        />
      </div>
    </Box>
  );
};

const TaskBoard = () => {
  const [activeTab, setActiveTab] = useState('My List');
  const [taskState, setTaskState] = useState({});
  const [starredTasks, setStarredTasks] = useState([]); // State for starred tasks
  const [completedTasks, setCompletedTasks] = useState({}); // State for completed tasks, per tab
  const [isCompletedOpen, setIsCompletedOpen] = useState({}); // Track "Completed" dropdown state per tab

  const handleIconClick = (task) => {
    setTaskState((prevState) => {
      const isCompleted = !prevState[task]?.isCircleFilled; // Check if the task is completed
      const updatedCompletedTasks = isCompleted
        ? [...(completedTasks[activeTab] || []), task] // Add to completed tasks for the current tab
        : (completedTasks[activeTab] || []).filter((t) => t !== task); // Remove from completed tasks

      setCompletedTasks((prevState) => ({
        ...prevState,
        [activeTab]: updatedCompletedTasks, // Update the completed tasks for the active tab
      }));

      return {
        ...prevState,
        [task]: {
          ...prevState[task],
          isCircleFilled: isCompleted,
        },
      };
    });
  };

  const handleFavoriteClick = (task) => {
    setTaskState((prevState) => {
      const isFavorite = !prevState[task]?.isFavorite;
      const updatedStarredTasks = isFavorite
        ? [...starredTasks, task] // Add to starred tasks
        : starredTasks.filter((t) => t !== task); // Remove from starred tasks

      setStarredTasks(updatedStarredTasks); // Update starred tasks

      return {
        ...prevState,
        [task]: {
          ...prevState[task],
          isFavorite: isFavorite,
        },
      };
    });
  };

  const toggleCompleted = () => {
    setIsCompletedOpen((prevState) => ({
      ...prevState,
      [activeTab]: !prevState[activeTab], // Toggle the completed dropdown for the active tab
    }));
  };

  const renderListItems = (items) => (
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

  const renderCompletedTasks = () => {
    const completedCount = (completedTasks[activeTab] || []).length; // Count of completed tasks for the active tab
  
    return (
      <Box className="task-completed">
        <Text className="completed-heading" onClick={toggleCompleted} style={{ cursor: 'pointer' }}>
          Completed ({completedCount}) {/* Display the count here */}
          <Icon name={isCompletedOpen[activeTab] ? "bx-chevron-down" : "bx-chevron-right"} />
        </Text>
        {isCompletedOpen[activeTab] && ( // Render completed tasks if dropdown is open for the active tab
          <Box className="completed-dropdown">
            {completedCount === 0 ? ( // Use completedCount instead of calculating again
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
  
  const renderContent = () => {
    if (activeTab === 'star') {
      return (
        <Box className="task-board-workarea">
          <Box className="my-list">
            <Text className="task-list-heading">Starred Tasks</Text>
            <Box className="icon-container">
              <Icon name="bx-shuffle" className="icon" />
              <Icon name="bx-dots-vertical-rounded" className="icon" />
            </Box>
          </Box>
          {starredTasks.length === 0 ? (
            <Text className="empty-starred-task">No starred tasks</Text>
          ) : (
            starredTasks.map((task, index) => (
              <TaskItem
                key={index}
                item={task}
                isCircleFilled={taskState[task]?.isCircleFilled || false}
                isFavorite={true} // This is always true for starred tasks
                onIconClick={handleIconClick}
                onFavoriteClick={handleFavoriteClick}
              />
            ))
          )}
        </Box>
      );
    }

    return (
      <Box className="task-board-workarea">
        <Box className="my-list">
          <Text className="task-list-heading">{activeTab}</Text>
          <Box className="icon-container">
            <Icon name="bx-shuffle" className="icon" />
            <Icon name="bx-dots-vertical-rounded" className="icon" />
          </Box>
        </Box>
        {renderListItems(tabData[activeTab])}
        {renderCompletedTasks()}
      </Box>
    );
  };

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
            <Text className="task-my-list">{tab}</Text>
          </Box>
        ))}
      </Box>

      {renderContent()}
    </Box>
  );
};

export default TaskBoard;
