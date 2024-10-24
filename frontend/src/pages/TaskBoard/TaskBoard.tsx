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

  const handleIconClick = (task) => {
    setTaskState((prevState) => ({
      ...prevState,
      [task]: {
        ...prevState[task],
        isCircleFilled: !prevState[task]?.isCircleFilled,
      },
    }));
  };

  const handleFavoriteClick = (task) => {
    setTaskState((prevState) => {
      const isFavorite = !prevState[task]?.isFavorite;
      // Update the starredTasks list based on favorite status
      const updatedStarredTasks = isFavorite
        ? [...starredTasks, task] // Add task to starred if favorited
        : starredTasks.filter((t) => t !== task); // Remove task from starred if unfavorited

      setStarredTasks(updatedStarredTasks); // Update the starredTasks state

      return {
        ...prevState,
        [task]: {
          ...prevState[task],
          isFavorite: isFavorite,
        },
      };
    });
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
            <Text>No starred tasks</Text>
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
        {activeTab === 'My List' && (
          <Box className="task-completed">
            <Text className="completed-heading">Completed</Text>
            <Icon name="bx-chevron-right" className="small-icon" />
          </Box>
        )}
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
