import { useState } from 'react';
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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from '@chakra-ui/react';
import Icon from '../Icon/Icon';
import './TasksList.scss';
import { useTaskContext } from '../../contexts/TaskContext/TaskContext';
import { useBackendAPIContext } from '../../contexts/BackendAPIContext/BackendAPIContext';

const TasksList = () => {
    const {
        taskLists,
        allTasks,
        fetchTaskLists,
        setNotification,
        notification,
    } = useTaskContext();
    const { client } = useBackendAPIContext();
    const [tabs, setTabs] = useState([
        'importants',
        ...taskLists.map((taskList) => taskList.task_list_name),
    ]);
    const importantTasks = allTasks.filter((task) => task.is_favorite);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [newListVisible, setNewListVisible] = useState(false);
    const [newListName, setNewListName] = useState('');
    const [completedVisible, setCompletedVisible] = useState(false);

    // const [isMoreOptionVisible, setIsMoreOptionVisible] = useState(false);
    const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);
    const [isBackgroundDimmed, setIsBackgroundDimmed] = useState(false);

    const [newTask, setNewTask] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskTime, setTaskTime] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const activeList = taskLists[selectedTabIndex] || { name: '', tasks: [] };
    const completedCount = (
        selectedTabIndex === 0
            ? importantTasks
            : taskLists[selectedTabIndex -1  ].tasks
    ).filter((task) => task.is_completed).length;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    interface Task {
        task: string;
        favorite: boolean;
        completed: boolean;
        date: string;
        time: string;
        description: string;
    }

    const openTaskDetails = (task: Task) => {
        console.log('Opening');
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    const toggleNewListForm = () => setNewListVisible((prev) => !prev);

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

    const handleNewListSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newListName.trim()) return;
    
        try {
            const response = await client.post('/task-lists/create', {
                task_list_name: newListName.trim(),
            });
    
            // Ensure response contains the expected structure
            if (!response.data?.createdTaskList?._id) {
                throw new Error('Invalid response format: Missing createdTaskList.');
            }
    
            // Create new list object
            const newList = {
                id: response.data.createdTaskList._id, // Correctly map _id to id
                name: newListName.trim(),
                tasks: [],
                type: 'ordinary' as const,
            };
    
            console.log('New Task List:', newList); // Debugging
    
            // Refresh task lists instead of modifying state manually
            fetchTaskLists();
    
            // Reset form fields and UI state
            setNewListName('');
            setNewListVisible(false);
    
            // Set selected index to the last added list
            setSelectedTabIndex((prev) => prev );
            console.error('New list created successfully!');
    
            // showNotification('New list created successfully!');
        } catch (error) {
            console.error('Error creating task list:', error);
            // showNotification('Failed to create new list. Please try again.');
        }
        fetchTaskLists();
    };

    const handleUpdateTaskImportant = async (taskId: string) => {
        try {
            const updatedTaskList = taskLists[selectedTabIndex];
            const taskToUpdate = updatedTaskList?.tasks.find((task) => task._id === taskId);
    
            if (!taskToUpdate) {
                console.log('Task not found')
                // showNotification('Error: Task not found!');
                return;
            }
    
            // Prepare request payload
            const requestBody = {
                task_name: taskToUpdate.task_name,
                is_important: !taskToUpdate.is_favorite,
                is_completed: taskToUpdate.is_completed,
            };
    
            const response = await client.patch(`/task/update/${taskId}`, requestBody);
    
            if (response.status === 200) {
                const updatedTask = response.data.taskToUpdate;
                const isNowFavorite = updatedTask.is_important;
    
                fetchTaskLists();
                // setTaskLists((prev) =>
                //     prev.map((list, index) => {
                //         if (index === 0 && isNowFavorite) {
                //             // Add task to the "Favorites" tab (assumed to be index 0)
                //             return {
                //                 ...list,
                //                 tasks: [...list.tasks, { ...taskToUpdate, favorite: true }],
                //             };
                //         } else if (index === selectedTabIndex) {
                //             // Remove task from the current list if it's favorited
                //             return {
                //                 ...list,
                //                 tasks: list.tasks.filter((task) => task.id !== taskId),
                //             };
                //         }
                //         return list;
                //     })
                // );
    
                // showNotification(isNowFavorite ? 'Task added to Favorites!' : 'Task removed from Favorites!');
            } else {
                console.log('failed to update')
                // showNotification('Failed to update task. Please try again.');
            }
        } catch (error) {
            console.error('Error updating task:', error);
            // showNotification('Failed to update task. Please try again.');
        }
    };
    
    

    const handleNewTaskSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newTask.trim()) return;
    
        // Get the selected task list
        const selectedTaskList = taskLists[selectedTabIndex];
        if (!selectedTaskList) {
            // showNotification('Error: Selected task list not found!');
            console.error('Error: Selected task list not found!');
            return;
        }
    
        const task_list_id = selectedTaskList._id;
        console.log('Selected Task List:', task_list_id);
        const task_name = newTask;
    
        // Handle due time
        let due_time = null;
        if (taskTime) {
            const [hours, minutes] = taskTime.split(':').map(Number);
            due_time = new Date();
            due_time.setHours(hours, minutes, 0, 0);
        }
    
        console.log('Selected Date:', taskDate, 'Selected Time:', taskTime);
    
        // Handle due date
        let due_date = null;
        if (taskDate) {
            due_date = new Date(taskDate);
            if (due_time) {
                due_date.setHours(due_time.getHours(), due_time.getMinutes());
            }
        }
    
        const description = taskDescription;
    
        // Construct API request body
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
                // Refresh task lists instead of modifying state manually
                fetchTaskLists();
    
                // Clear form fields
                setNewTask('');
                setTaskDate('');
                setTaskTime('');
                setTaskDescription('');
                console.error('Task added successfully!');
    
                // showNotification('Task added successfully!');
            } else {
                throw new Error('Failed to retrieve task details from response.');
            }
        } catch (error) {
            console.error('Error adding task:', error);
            // showNotification('Failed to add task. Please try again.');
        }
    };
    
    const handleRemoveTaskFromFavorites = async (taskId: string) => {
        try {
            const updatedTaskList = taskLists[selectedTabIndex];
            const taskToUpdate = updatedTaskList?.tasks.find((task) => task.id === taskId);
    
            if (!taskToUpdate) {
                console.log('Error: Task not found!');
                // showNotification('Error: Task not found!');
                return;
            }
    
            // Prepare request payload
            const requestBody = {
                task_name: taskToUpdate._id,
                is_important: false,  // Set as false to remove from favorites
                is_completed: taskToUpdate.is_completed,
            };
    
            const response = await client.patch(`/task/update/${taskId}`, requestBody);
    
            if (response.status === 200) {
                const updatedTask = response.data.taskToUpdate;
                const isNowFavorite = updatedTask.is_important;
                fetchTaskLists();
                // showNotification(isNowFavorite ? 'Task added to Favorites!' : 'Task removed from Favorites!');
            } else {
                console.log('failed to update task')
                // showNotification('Failed to update task. Please try again.');
            }
        } catch (error) {
            console.error('Error updating task:', error);
            // showNotification('Failed to update task. Please try again.');
        }
    };

    const deleteTask = async (taskId: string) => {
        try {
            const res = await client.delete(`/task/delete/${taskId}`);
            const deletedTask = await res.data.deletedTask;
            if (deletedTask) {
                fetchTaskLists();
                // taskLists
                //     .find(
                //         (taskList) => taskList._id === deletedTask.task_list_id
                //     )
                //     ?.tasks.filter((task) => task._id !== taskId);
            } else throw new Error("Couldn't delete task!");
        } catch (error) {
            console.error("Couldn't delete task: ", error);
        }
    };

    return (
        <Box className='tasks-list' width='100%' cursor='pointer'>
            {notification && <Box className='notification'>{notification}</Box>}

            {/* Tab Header */}
            <Flex
                className='tabs-container'
                borderBottom='1px solid #ddd'
                gap='20px'
            >
                {tabs.map((tab, index) => (
                    <Box
                        key={index}
                        className={`tasks-tab ${
                            index === selectedTabIndex ? 'selected' : ''
                        }`}
                        onClick={() => {
                            setSelectedTabIndex(index);
                            setNewListVisible(false); // Reset the form visibility
                        }}
                    >
                        {tab === 'importants' ? (
                            <Icon name='bxs-star' className='important-icon' />
                        ) : (
                            <Text>{tab}</Text>
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
                <form className='new-list-form'>
                    <FormControl>
                        <Input
                            placeholder='New List Name'
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            autoFocus
                        />
                    </FormControl>
                    <Button type='submit' onClick={handleNewListSubmit}>
                        <Icon name='bx-check' />
                    </Button>
                </form>
            )}

            {/* Task List */}
            <Box className='task-list'>
                <Flex className='list-header'>
                    <Text>
                        {selectedTabIndex === 0
                            ? 'Important Tasks'
                            : taskLists[selectedTabIndex -1

                            ].task_list_name}
                    </Text>

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
                                <MenuItem>
                                    <Icon name='bx-edit' />
                                    <Text>Rename</Text>
                                </MenuItem>

                                <MenuItem>
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
                        <form onClick={handleNewTaskSubmit}>
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
                    {(selectedTabIndex === 0
                        ? importantTasks
                        : taskLists[selectedTabIndex].tasks
                    )
                        .filter((task) => !task.is_completed)
                        .map((task) => (
                            <Flex
                                as='li'
                                key={task._id}
                                alignItems='center'
                                onClick={() => {
                                    // console.log("Clicked me");
                                    //   openTaskDetails(task);
                                }}
                                cursor='pointer'
                            >
                                <Box cursor='pointer'>
                                    <Icon
                                        name={
                                            task.is_completed
                                                ? 'bxs-circle'
                                                : 'bx-circle'
                                        }
                                        className='task-circle-icon'
                                    />
                                </Box>

                                <Flex direction='column' ml='10px'>
                                    <Text>{task.task_name}</Text>
                                    {task.due_date && (
                                        <Text fontSize='sm' color='gray.500'>
                                            Date:{' '}
                                            {new Date(
                                                task.due_date
                                            ).toLocaleString()}
                                        </Text>
                                    )}
                                </Flex>

                                {/* <Text ml="10px">{task.task}</Text> */}

                                <Flex ml='auto' gap='10px' alignItems='center'>
                                    <Box
                                        ml='auto'
                                        cursor={'pointer'}
                                        onClick={() => deleteTask(task._id)}
                                    >
                                        <Icon
                                            name='bx-trash'
                                            className='favorite-icon'
                                        />
                                    </Box>

                                    <Box     ml='auto' 
                                            cursor={'pointer'} 
                                            onClick = {() => handleUpdateTaskImportant(task._id)}>
                                        <Icon
                                            name={
                                                task.is_favorite
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
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Task Details</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {selectedTask && (
                                <Box>
                                    <Text>
                                        <strong>Task:</strong>{' '}
                                        {selectedTask.task}
                                    </Text>
                                    <Text>
                                        <strong>Description:</strong>{' '}
                                        {selectedTask.description ||
                                            'No description'}
                                    </Text>
                                    <Text>
                                        <strong>Date:</strong>{' '}
                                        {selectedTask.date || 'N/A'}
                                    </Text>
                                    <Text>
                                        <strong>Time:</strong>{' '}
                                        {selectedTask.time || 'N/A'}
                                    </Text>
                                    <Text>
                                        <strong>Favorite:</strong>{' '}
                                        {selectedTask.favorite ? 'Yes' : 'No'}
                                    </Text>
                                    <Text>
                                        <strong>Completed:</strong>{' '}
                                        {selectedTask.completed ? 'Yes' : 'No'}
                                    </Text>
                                </Box>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' onClick={closeModal}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
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
                        {(selectedTabIndex === 0
                            ? importantTasks
                            : taskLists[selectedTabIndex - 1].tasks
                        )
                            .map((task, index) => ({ task, index }))
                            .filter(({ task }) => task.is_completed)
                            .map(({ task, index }) => (
                                <Flex as='li' key={index} alignItems='center'>
                                    <Icon
                                        name='bx-check-circle'
                                        className='completed-icon'
                                    />
                                    <Text
                                        ml='10px'
                                        textDecoration='line-through'
                                        color='gray.500'
                                        cursor='pointer'
                                    >
                                        {task.task_name}
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
