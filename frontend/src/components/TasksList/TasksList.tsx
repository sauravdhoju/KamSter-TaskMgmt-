import { useState, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';
import {
    Box,
    Flex,
    Text,
    FormControl,
    Input,
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import Icon from '../Icon/Icon';
import './TasksList.scss';
import { useBackendAPIContext } from '../../contexts/BackendAPIContext/BackendAPIContext';
import {
    useTaskContext,
    Task,
    TaskList,
} from '../../contexts/TaskContext/TaskContext';
const TasksList = () => {
    const [searchParams] = useSearchParams();
    const {
        fetchTaskLists,
        taskLists,
        setTaskLists,
        notification,
        setNotification,
    } = useTaskContext();
    const { allTasks } = useTaskContext();
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [newListVisible, setNewListVisible] = useState(false);
    const [newListName, setNewListName] = useState('');
    const [completedVisible, setCompletedVisible] = useState(false);

    const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);
    const [isBackgroundDimmed, setIsBackgroundDimmed] = useState(false);

    const [newTask, setNewTask] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskTime, setTaskTime] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const favoritesList: TaskList = {
        id: 'favorites',
        name: 'Favourite', // Star icon for Favorites
        tasks: [],
        type: 'default',
    };

    const myList: TaskList = {
        id: 'mylists',
        name: 'My Lists', // My Lists tab, can hold all tasks added to it
        tasks: [], // This will hold tasks added specifically to "My Lists"
        type: 'default',
    };
    const [taskListTabs, setTaskListTabs] = useState([
        favoritesList,
        myList,
        ...taskLists,
    ]);
    const [activeList, setActiveList] = useState(
        taskListTabs?.[selectedTabIndex] ?? {
            name: '',
            tasks: [],
        }
    );
    const completedCount = activeList.tasks.filter(
        (task) => task.completed
    ).length;
    const { client } = useBackendAPIContext();

    const handleRenameList = async () => {
        const newListName = prompt('Enter new list name:', activeList.name);
        if (newListName) {
            try {
                const currentList = taskListTabs[selectedTabIndex];

                if (currentList.type === 'default') {
                    showNotification('Cannot rename default lists');
                    return;
                }

                // Removed the /api prefix since it's likely already in the client base URL
                await client.patch(`/task-lists/rename/${currentList.id}`, {
                    newTaskName: newListName,
                });

                setTaskLists((prev) =>
                    prev.map((list, index) =>
                        index === selectedTabIndex
                            ? { ...list, name: newListName }
                            : list
                    )
                );
                showNotification(`List renamed to "${newListName}"`);
            } catch (error) {
                console.error('Error renaming list:', error);
                showNotification('Failed to rename list. Please try again.');
            }
        }
    };

    const handleDeleteList = async () => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this list?'
        );
        if (confirmDelete) {
            try {
                const currentList = taskListTabs[selectedTabIndex];

                if (currentList.type === 'default') {
                    showNotification('Cannot delete default lists');
                    return;
                }

                await client.delete(`/task-lists/delete/${currentList.id}`);
                setTaskLists((prev) =>
                    prev.filter((_, index) => index !== selectedTabIndex)
                );
                showNotification('List deleted!');
                setSelectedTabIndex(0);
            } catch (error) {
                console.error('Error deleteing list:', error);
                showNotification('Failed to delete list. Please try again.');
            }
        }
    };

    const handleAddTaskClick = () => {
        setIsAddTaskVisible(!isAddTaskVisible);
        setIsBackgroundDimmed(!isBackgroundDimmed);
    };

    const handleCancelClick = () => {
        setIsAddTaskVisible(false);
        setIsBackgroundDimmed(false);

        setNewTask('');
        setTaskDate('');
        setTaskTime('');
        setTaskDescription('');
    };

    const deleteTask = async (taskId: string) => {
        if (!activeList) return;

        const taskToDelete = activeList.tasks.find(
            (task) => task.id === taskId
        );

        if (!taskToDelete) {
            showNotification('Task not found.');
            return;
        }

        setTaskLists((prev) =>
            prev.map((list) =>
                list.id === activeList.id
                    ? {
                          ...list,
                          tasks: list.tasks.filter(
                              (task) => task.id !== taskId
                          ),
                      }
                    : list
            )
        );

        try {
            const response = await client.delete(`/task/delete/${taskId}`);

            if (response.status === 200) {
                showNotification('Task deleted successfully!');
            } else {
                setTaskLists((prev) =>
                    prev.map((list) =>
                        list.id === activeList.id
                            ? { ...list, tasks: [...list.tasks, taskToDelete] }
                            : list
                    )
                );
                showNotification('Failed to delete task. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting task:', error);

            // Restore the task in case of an error
            setTaskLists((prev) =>
                prev.map((list) =>
                    list.id === activeList.id
                        ? { ...list, tasks: [...list.tasks, taskToDelete] }
                        : list
                )
            );
            showNotification('Failed to delete task. Please try again.');
        }
    };

    const showNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    const handleUpdateTaskImportant = async (taskId: string) => {
        try {
            const updatedTaskList = taskListTabs[selectedTabIndex];
            const taskToUpdate = updatedTaskList?.tasks.find(
                (task) => task.id === taskId
            );

            if (!taskToUpdate) {
                showNotification('Error: Task not found!');
                return;
            }

            // Prepare request payload
            const requestBody = {
                task_name: taskToUpdate.task,
                is_important: !taskToUpdate.favorite,
                is_completed: taskToUpdate.completed,
            };

            const response = await client.patch(
                `/task/update/${taskId}`,
                requestBody
            );

            if (response.status === 200) {
                const updatedTask = response.data.taskToUpdate;
                const isNowFavorite = updatedTask.is_important;

                setTaskLists((prev) =>
                    prev.map((list, index) => {
                        if (index === 0 && isNowFavorite) {
                            // Add task to the "Favorites" tab (assumed to be index 0)
                            return {
                                ...list,
                                tasks: [
                                    ...list.tasks,
                                    { ...taskToUpdate, favorite: true },
                                ],
                            };
                        } else if (index === selectedTabIndex) {
                            // Remove task from the current list if it's favorited
                            return {
                                ...list,
                                tasks: list.tasks.filter(
                                    (task) => task.id !== taskId
                                ),
                            };
                        }
                        return list;
                    })
                );

                showNotification(
                    isNowFavorite
                        ? 'Task added to Favorites!'
                        : 'Task removed from Favorites!'
                );
            } else {
                showNotification('Failed to update task. Please try again.');
            }
        } catch (error) {
            console.error('Error updating task:', error);
            showNotification('Failed to update task. Please try again.');
        }
    };

    const handleRemoveTaskFromFavorites = async (taskId: string) => {
        try {
            const updatedTaskList = taskListTabs[selectedTabIndex];
            const taskToUpdate = updatedTaskList?.tasks.find(
                (task) => task.id === taskId
            );

            if (!taskToUpdate) {
                showNotification('Error: Task not found!');
                return;
            }

            // Prepare request payload
            const requestBody = {
                task_name: taskToUpdate.task,
                is_important: false, // Set as false to remove from favorites
                is_completed: taskToUpdate.completed,
            };

            const response = await client.patch(
                `/task/update/${taskId}`,
                requestBody
            );

            if (response.status === 200) {
                const updatedTask = response.data.taskToUpdate;
                const isNowFavorite = updatedTask.is_important;
                fetchTaskLists();
                showNotification(
                    isNowFavorite
                        ? 'Task added to Favorites!'
                        : 'Task removed from Favorites!'
                );
            } else {
                showNotification('Failed to update task. Please try again.');
            }
        } catch (error) {
            console.error('Error updating task:', error);
            showNotification('Failed to update task. Please try again.');
        }
    };

    const handleNewListSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newListName.trim()) return;

        try {
            const response = await client.post('/task-lists/create', {
                task_list_name: newListName.trim(),
            });

            // Access the createdTaskList from the response
            const newList = {
                id: response.data.createdTaskList._id, // Use the correct _id here
                name: newListName.trim(),
                tasks: [],
                type: 'ordinary' as const,
            };

            console.log('New List:', newList); // Check the newly created list

            setTaskLists((prev) => [...prev, newList]);

            setNewListName('');
            setNewListVisible(false);
            setSelectedTabIndex(taskListTabs.length);
            showNotification('New list created!');
        } catch (error) {
            console.error('Error creating task List: ', error);
            showNotification('Failed to create new list. Please try again.');
        }
    };

    const handleNewTaskSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        // Get the selected task list
        const selectedTaskList = taskListTabs[selectedTabIndex];
        if (!selectedTaskList) {
            showNotification('Error: Selected task list not found!');
            return;
        }

        const task_list_id = selectedTaskList.id; // Get the selected task list ID
        const task_name = newTask;
        const [hours, minutes] = taskTime.split(':').map(Number);
        const due_date = new Date(taskDate);
        if (taskTime !== '') {
            const due_time = new Date();
            due_time.setHours(hours, minutes, 0, 0);

            due_date.setHours(
                due_time.getHours(),
                due_time.getMinutes(),
                due_time.getSeconds(),
                due_time.getMilliseconds()
            );
        }

        const description = taskDescription;

        const requestBody = {
            task_list_id,
            task_name,
            due_date,
            description,
        };
        console.log('Request Payload:', requestBody);

        try {
            const response = await client.post('/task/add', requestBody);
            console.log('Backend Response:', response);

            if (response.status === 200 && response.data?.addedTask) {
                const addedTask = response.data.addedTask; // Extract the added task

                // Map _id to id and adjust other fields
                const newTaskObj: Task = {
                    id: addedTask._id, // Correctly map _id to id
                    task: addedTask.task_name,
                    completed: addedTask.is_completed || false,
                    favorite: addedTask.is_important || false,
                    due_date: addedTask.due_date || '',
                    time: addedTask.created_at || '', // Adjust time logic as needed
                    description: addedTask.description || '',
                };

                console.log(newTaskObj);

                // Update local state with the new task
                setTaskLists((prev) =>
                    prev.map((list) =>
                        list.id === task_list_id
                            ? { ...list, tasks: [...list.tasks, newTaskObj] }
                            : list
                    )
                );

                // Clear form fields
                setNewTask('');
                setTaskDate('');
                setTaskTime('');
                setTaskDescription('');

                showNotification('Task added successfully!');
            } else {
                console.error('Unexpected response format:', response.data);
                throw new Error(
                    'Failed to retrieve task details from the response.'
                );
            }
        } catch (error) {
            console.error('Error adding task:', error);
            showNotification('Failed to add task. Please try again.');
        }
    };

    const toggleNewListForm = () => setNewListVisible((prev) => !prev);

    const toggleTaskCompletion = (taskId: string) => {
        console.log('Toggling task completion for taskId:', taskId);

        let taskToUpdate;
        let listIndex = -1;

        // Search through all lists to find the task and its list index
        for (let i = 0; i < taskListTabs.length; i++) {
            const list = taskListTabs[i];
            console.log('Checking list:', list.id);

            const task = list.tasks.find((t) => {
                console.log(
                    `Comparing task.id: ${t.id} with taskId: ${taskId}`
                ); // Log task comparison
                return t.id === taskId;
            });

            if (task) {
                taskToUpdate = task;
                listIndex = i;
                break;
            }
        }

        if (!taskToUpdate) {
            console.error('Error: Task not found in any list.');
            showNotification('Error: Task not found.');
            return;
        }

        console.log('Found task:', taskToUpdate);

        const updatedTask = {
            ...taskToUpdate,
            completed: !taskToUpdate.completed,
        };
        fetchTaskLists();

        // Send the update request to the backend
        client
            .patch(`/task/update/${taskId}`, {
                task_name: updatedTask.task,
                is_important: updatedTask.favorite,
                is_completed: updatedTask.completed,
            })
            .then((response) => {
                if (response.status === 200) {
                    const message = updatedTask.completed
                        ? `Task "${updatedTask.task}" marked as completed.`
                        : `Task "${updatedTask.task}" marked as incomplete.`;

                    showNotification(message);
                } else {
                    // In case backend fails, revert the optimistic update
                    setTaskLists((prev) =>
                        prev.map((list, index) =>
                            index === listIndex
                                ? {
                                      ...list,
                                      tasks: list.tasks.map((t) =>
                                          t.id === taskId
                                              ? {
                                                    ...t,
                                                    completed:
                                                        !updatedTask.completed,
                                                }
                                              : t
                                      ),
                                  }
                                : list
                        )
                    );
                    showNotification(
                        'Failed to update task. Please try again.'
                    );
                }
            })
            .catch((error) => {
                console.error('Error updating task completion:', error);
                // In case of error, revert the optimistic update
                setTaskLists((prev) =>
                    prev.map((list, index) =>
                        index === listIndex
                            ? {
                                  ...list,
                                  tasks: list.tasks.map((t) =>
                                      t.id === taskId
                                          ? {
                                                ...t,
                                                completed:
                                                    !updatedTask.completed,
                                            }
                                          : t
                                  ),
                              }
                            : list
                    )
                );
                showNotification('Failed to update task. Please try again.');
            });
    };

    useEffect(() => {
        const searchedTaskListName = searchParams.get('task-list-name');
        if (searchedTaskListName) {
            const taskListIndex = taskListTabs.findIndex(
                (taskList) => taskList.name === searchedTaskListName
            );
            if (taskListIndex !== -1 && taskListIndex !== selectedTabIndex) {
                setSelectedTabIndex(taskListIndex);
            }
        }
        setActiveList(taskListTabs[selectedTabIndex]);
        setTaskListTabs([favoritesList, myList, ...taskLists]);
    }, [taskLists, searchParams, selectedTabIndex]);

    return (
        <Box className='tasks-list' width='100%' cursor='pointer'>
            {notification && <Box className='notification'>{notification}</Box>}

            {/* Tab Header */}
            <Flex
                className='tabs-container'
                borderBottom='1px solid #ddd'
                gap='20px'
            >
                {taskListTabs.map((list) => (
                    <Box
                        key={list.id}
                        className={`tasks-tab ${
                            list.id === taskListTabs[selectedTabIndex]?.id
                                ? 'selected'
                                : ''
                        }`}
                        onClick={() => {
                            const selectedIndex = taskListTabs.findIndex(
                                (item) => item.id === list.id
                            );
                            console.log(list.id);
                            setSelectedTabIndex(selectedIndex);
                            setNewListVisible(false); // Reset the form visibility
                        }}
                    >
                        {list.name === 'My Lists' ? (
                            <Text>My List</Text> // Display "My List" for the My Lists tab
                        ) : list.name === 'Favourite' ? (
                            <Icon name='bxs-star' className='important-icon' />
                        ) : (
                            <Text>{list.name}</Text> // Display fetched tab names for other tabs
                        )}
                    </Box>
                ))}

                <Box
                    className='tasks-tab new-list-btn'
                    onClick={toggleNewListForm}
                >
                    <Icon name='bx-plus' />
                    <Text>New List</Text>
                </Box>
            </Flex>

            {newListVisible && (
                <form onSubmit={handleNewListSubmit} className='new-list-form'>
                    <FormControl>
                        <Input
                            placeholder='New List Name'
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            autoFocus
                        />
                    </FormControl>
                    <Button type='submit'>
                        <Icon name='bx-check' />
                    </Button>
                </form>
            )}

            {/* Task List */}
            <Box className='task-list'>
                <Flex className='list-header'>
                    <Text>{activeList.name}</Text>

                    <Flex className='list-actions' gap='10px'>
                        {/* add task icon */}
                        <Box
                            className='add-task-icon-container'
                            cursor='pointer'
                            onClick={handleAddTaskClick}
                        >
                            <Icon name='bx-plus-circle' aria-label='Add Task' />
                        </Box>

                        <Menu>
                            <MenuButton>
                                <Icon name='bx-dots-vertical-rounded' />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={handleRenameList}>
                                    <Icon name='bx-edit' />
                                    <Text>Rename</Text>
                                </MenuItem>

                                <MenuItem onClick={handleDeleteList}>
                                    <Icon name='bx-trash' />
                                    <Text>Delete</Text>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                <div
                    className={`background ${
                        isBackgroundDimmed ? 'dimmed' : ''
                    }`}
                />
                {isAddTaskVisible && (
                    <Box
                        className='add-task-container'
                        p='4'
                        border='1px solid #ddd'
                        borderRadius='md'
                        mt='4'
                    >
                        <form onSubmit={handleNewTaskSubmit}>
                            <Flex direction='column' gap='10px'>
                                <FormControl isRequired>
                                    <Input
                                        placeholder='Task Name'
                                        value={newTask}
                                        onChange={(e) =>
                                            setNewTask(e.target.value)
                                        }
                                    />
                                </FormControl>

                                <FormControl>
                                    <Input
                                        type='text'
                                        placeholder='Short Description'
                                        value={taskDescription}
                                        onChange={(e) =>
                                            setTaskDescription(e.target.value)
                                        }
                                    />
                                </FormControl>

                                <FormControl>
                                    <Input
                                        type='date'
                                        value={taskDate}
                                        onChange={(e) =>
                                            setTaskDate(e.target.value)
                                        }
                                        placeholder='Select Date'
                                    />
                                </FormControl>

                                <FormControl>
                                    <Input
                                        type='time'
                                        value={taskTime}
                                        onChange={(e) =>
                                            setTaskTime(e.target.value)
                                        }
                                        placeholder='Select Time'
                                    />
                                </FormControl>

                                <Button type='submit'>Add Task</Button>
                                <Button
                                    type='button'
                                    onClick={handleCancelClick}
                                >
                                    Cancel
                                </Button>
                            </Flex>
                        </form>
                    </Box>
                )}
                <Box as='ul'>
                    {activeList.name === 'Favourite'
                        ? allTasks
                              .filter((task) => task.favorite)
                              .map((task) => ({ task }))
                              .filter(({ task }) => !task.completed)
                              .map(({ task }) => (
                                  <Flex
                                      as='li'
                                      key={task.id}
                                      alignItems='center'
                                  >
                                      <Box
                                          onClick={() =>
                                              toggleTaskCompletion(task.id)
                                          }
                                          cursor='pointer'
                                      >
                                          <Icon
                                              name={
                                                  task.completed
                                                      ? 'bxs-circle'
                                                      : 'bx-circle'
                                              }
                                              className='task-circle-icon'
                                          />
                                      </Box>

                                      <Flex direction='column' ml='10px'>
                                          <Text>{task.task}</Text>
                                          {task.due_date &&
                                              !isNaN(
                                                  new Date(
                                                      task.due_date
                                                  ).getTime()
                                              ) && (
                                                  <Text
                                                      fontSize='sm'
                                                      color='gray.500'
                                                  >
                                                      Due Date:{' '}
                                                      {new Date(
                                                          task.due_date
                                                      ).toLocaleDateString()}
                                                  </Text>
                                              )}

                                          {/* Limit description to 100 characters */}
                                          {task.description && (
                                              <Text
                                                  fontSize='sm'
                                                  color='gray.500'
                                              >
                                                  Description:{' '}
                                                  {task.description.length > 100
                                                      ? `${task.description.slice(
                                                            0,
                                                            100
                                                        )}...`
                                                      : task.description}
                                              </Text>
                                          )}
                                      </Flex>

                                      <Flex
                                          ml='auto'
                                          gap='10px'
                                          alignItems='center'
                                      >
                                          <Box
                                              ml='auto'
                                              onClick={() =>
                                                  deleteTask(task.id)
                                              }
                                              cursor={'pointer'}
                                          >
                                              <Icon
                                                  name='bx-trash'
                                                  className='favorite-icon'
                                              />
                                          </Box>

                                          <Box
                                              ml='auto'
                                              onClick={() =>
                                                  task.favorite
                                                      ? handleRemoveTaskFromFavorites(
                                                            task.id
                                                        )
                                                      : handleUpdateTaskImportant(
                                                            task.id
                                                        )
                                              }
                                              cursor={'pointer'}
                                          >
                                              <Icon
                                                  name={
                                                      task.favorite
                                                          ? 'bxs-star'
                                                          : 'bx-star'
                                                  }
                                                  className='favorite-icon'
                                              />
                                          </Box>
                                      </Flex>
                                  </Flex>
                              ))
                        : activeList.tasks
                              .map((task) => ({ task }))
                              .filter(({ task }) => !task.completed)
                              .map(({ task }) => (
                                  <Flex
                                      as='li'
                                      key={task.id}
                                      alignItems='center'
                                  >
                                      <Box
                                          onClick={() =>
                                              toggleTaskCompletion(task.id)
                                          }
                                          cursor='pointer'
                                      >
                                          <Icon
                                              name={
                                                  task.completed
                                                      ? 'bxs-circle'
                                                      : 'bx-circle'
                                              }
                                              className='task-circle-icon'
                                          />
                                      </Box>

                                      <Flex direction='column' ml='10px'>
                                          <Text>{task.task}</Text>
                                          {task.due_date &&
                                              !isNaN(
                                                  new Date(
                                                      task.due_date
                                                  ).getTime()
                                              ) && (
                                                  <Text
                                                      fontSize='sm'
                                                      color='gray.500'
                                                  >
                                                      Due Date:{' '}
                                                      {new Date(
                                                          task.due_date
                                                      ).toLocaleDateString()}
                                                  </Text>
                                              )}

                                          {/* Limit description to 100 characters */}
                                          {task.description && (
                                              <Text
                                                  fontSize='sm'
                                                  color='gray.500'
                                              >
                                                  Description:{' '}
                                                  {task.description.length > 100
                                                      ? `${task.description.slice(
                                                            0,
                                                            100
                                                        )}...`
                                                      : task.description}
                                              </Text>
                                          )}
                                      </Flex>

                                      <Flex
                                          ml='auto'
                                          gap='10px'
                                          alignItems='center'
                                      >
                                          <Box
                                              ml='auto'
                                              onClick={() =>
                                                  deleteTask(task.id)
                                              }
                                              cursor={'pointer'}
                                          >
                                              <Icon
                                                  name='bx-trash'
                                                  className='favorite-icon'
                                              />
                                          </Box>

                                          <Box
                                              ml='auto'
                                              onClick={() =>
                                                  task.favorite
                                                      ? handleRemoveTaskFromFavorites(
                                                            task.id
                                                        )
                                                      : handleUpdateTaskImportant(
                                                            task.id
                                                        )
                                              }
                                              cursor={'pointer'}
                                          >
                                              <Icon
                                                  name={
                                                      task.favorite
                                                          ? 'bxs-star'
                                                          : 'bx-star'
                                                  }
                                                  className='favorite-icon'
                                              />
                                          </Box>
                                      </Flex>
                                  </Flex>
                              ))}
                </Box>
            </Box>

            <Box className='completed-tasks'>
                <Flex
                    onClick={() => setCompletedVisible((prev) => !prev)}
                    justifyContent='space-between'
                    cursor='pointer'
                >
                    <Text>Completed ({completedCount})</Text>
                    <Icon
                        name={
                            completedVisible
                                ? 'bxs-chevron-down'
                                : 'bxs-chevron-right'
                        }
                    />
                </Flex>
                {completedVisible && (
                    <Box as='ul'>
                        {activeList.tasks
                            .map((task) => ({ task }))
                            .filter(({ task }) => task.completed)
                            .map(({ task }) => (
                                <Flex as='li' key={task.id} alignItems='center'>
                                    <Icon
                                        name='bx-check-circle'
                                        className='completed-icon'
                                    />
                                    <Text
                                        ml='10px'
                                        textDecoration='line-through'
                                        color='gray.500'
                                        onClick={() =>
                                            toggleTaskCompletion(task.id)
                                        }
                                        cursor='pointer'
                                    >
                                        {task.task}
                                    </Text>
                                </Flex>
                            ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default TasksList;
