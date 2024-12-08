import { useState } from 'react';
import {
    Box,
    Flex,
    Text,
    FormControl,
    Input,
    Button,
} from '@chakra-ui/react';
import Icon from '../Icon/Icon';
import './TasksList.scss';

const initialTaskLists = [
    {
        name: 'Favorite',
        tasks: [],
        type: 'default',
    },
    {
        name: 'My Lists',
        tasks: [{ task: 'Hanging', completed: false, favorite: false }],
        type: 'ordinary',
    },
    {
        name: 'Grocery',
        tasks: [{ task: 'Potato', completed: false, favorite: false }],
        type: 'ordinary',
    },
];

const TasksList = () => {
    const [taskLists, setTaskLists] = useState(initialTaskLists);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [newListVisible, setNewListVisible] = useState(false);
    const [newListName, setNewListName] = useState('');
    const [completedVisible, setCompletedVisible] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);
    
    const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);
    const [isBackgroundDimmed, setIsBackgroundDimmed] = useState(false);

    const [newTask, setNewTask] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskTime, setTaskTime] = useState('');
    const [taskDescription, setTaskDescription] = useState('');



    const activeList = taskLists[selectedTabIndex] || { name: '', tasks: [] };
    const completedCount = activeList.tasks.filter((task) => task.completed).length;
    
    interface Task{
        task: string;
        favorite: boolean;
        completed: boolean;
        date: Date;
        time: string;
        description: string;
    }

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
    }
    const deleteTask = (taskIndex: number) => {
        setTaskLists((prev) =>
            prev.map((list, index) =>
                index === selectedTabIndex
                    ? {
                          ...list,
                          tasks: list.tasks.filter((_, i) => i !== taskIndex),
                      }
                    : list
            )
        );
        showNotification('Task deleted!');
    }
    const showNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };


    const addToFavorites = (task: Task, sourceListIndex: number) => {
        setTaskLists((prev) =>
            prev.map((list, index) => {
                if (list.type === 'default') {
                    return { ...list, tasks: [...list.tasks, { ...task, favorite: true }] };
                }
                if (index === sourceListIndex) {
                    return {
                        ...list,
                        tasks: list.tasks.filter((t) => t.task !== task.task),
                    };
                }
                return list;
            })
        );
    };

    const removeFromFavorites = (task: Task) => {
        setTaskLists((prev) =>
            prev.map((list) => {
                if (list.type === 'default') {
                    return {
                        ...list,
                        tasks: list.tasks.filter((t) => t.task !== task.task),
                    };
                }
                if (list.type === 'ordinary') {
                    return {
                        ...list,
                        tasks: [...list.tasks, { ...task, favorite: false }],
                    };
                }
                return list;
            })
        );
    };

    const handleNewListSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newListName.trim()) return;
        const newList = { name: newListName, tasks: [], type: 'ordinary' };
        setTaskLists((prev) => [...prev, newList]);
        setNewListName('');
        setNewListVisible(false);
        setSelectedTabIndex(taskLists.length);
        showNotification('New list created!');
    };

    const handleNewTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        const newTaskObj = {
            task: newTask,
            completed: false,
            favorite: false,
            date: taskDate || null,
            time: taskTime || null,
        };
        
        setTaskLists((prev) =>
            prev.map((list, index) =>
                index === selectedTabIndex
                    ? { ...list, tasks: [...list.tasks, newTaskObj] }
                    : list
            )
        );
        setNewTask('');
        setTaskDate('');
        setTaskTime('');
        // console.log('Task added:', {taskDescription,taskDate, taskTime, newTask});
        showNotification('Task added!');
    };

    const toggleNewListForm = () => setNewListVisible((prev) => !prev);

    const toggleTaskCompletion = (taskIndex: number) => {
        const task = taskLists[selectedTabIndex].tasks[taskIndex];
        const message = task.completed
            ? `Task "${task.task}" marked as incomplete.`
            : `Task "${task.task}" marked as completed.`;
    
        setTaskLists((prev) =>
            prev.map((list, listIndex) =>
                listIndex === selectedTabIndex
                    ? {
                          ...list,
                          tasks: list.tasks.map((task, index) =>
                              index === taskIndex
                                  ? { ...task, completed: !task.completed }
                                  : task
                          ),
                      }
                    : list
            )
        );
    
        showNotification(message);
    };
    
    

    return (
        <Box className="tasks-list" width="100%">
            {notification && <Box className="notification">{notification}</Box>}

            {/* Tab Header */}
            <Flex className="tabs-container" borderBottom="1px solid #ddd" gap="20px">
                {taskLists.map((list, index) => (
                    <Box
                        key={index}
                        className={`tasks-tab ${index === selectedTabIndex ? 'selected' : ''}`}
                        onClick={() => {
                            setSelectedTabIndex(index); 
                            setNewListVisible(false); // Reset the form visibility
                        }}
                        
                    >
                        {list.type === 'default' ? (
                            <Icon name="bxs-star" className="important-icon" />
                        ) : (
                            <Text>{list.name}</Text>
                        )}
                    </Box>
                ))}
                <Box className="tasks-tab new-list-btn" onClick={toggleNewListForm}>
                    <Icon name="bx-plus" />
                    <Text>New List</Text>
                </Box>
            </Flex>

            {newListVisible && (
                <form onSubmit={handleNewListSubmit} className="new-list-form">
                    <FormControl>
                        <Input
                            placeholder="New List Name"
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            autoFocus
                        />
                    </FormControl>
                    <Button type="submit">
                        <Icon name="bx-check" />
                    </Button>
                </form>
            )}

            {/* Task Input Form
            <form onSubmit={handleNewTaskSubmit} className="new-task-form">
                <Flex gap="10px" alignItems="center">
                    <Input
                        placeholder="Add a new task"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />

                    <Input
                        type="date"
                        value={taskDate}
                        onChange={(e) => setTaskDate(e.target.value)}
                        placeholder="Select Date"
                    />

                    <Input
                        type="time"
                        value={taskTime}
                        onChange={(e) => setTaskTime(e.target.value)}
                        placeholder="Select Time"
                    />
                    <Button type="submit">Add</Button>
                </Flex>
            </form> */}

            {/* Task List */}
            <Box className="task-list">
                <Flex className="list-header">
                    <Text>{activeList.name}</Text>

                    {/* add task icon */}
                    <Box
                        cursor="pointer"
                        // onClick={() => setIsAddTaskVisible((prev) => !prev)}
                        onClick={handleAddTaskClick}

                        className="add-task-icon-container"
                    >
                        <Icon 
                            name='bx-plus-circle'
                            aria-label='Add Task'
                        />
                    </Box>
                </Flex>
                
                <div className={`background ${isBackgroundDimmed ? 'dimmed' : ''}`} />

                {isAddTaskVisible && (
                    <Box 
                        className="add-task-container"
                        p="4"
                        border="1px solid #ddd"
                        borderRadius="md"
                        mt="4"
                    >
                        <form onSubmit={handleNewTaskSubmit}>
                            <Flex direction="column" gap="10px">
                                <FormControl isRequired>
                                    <Input
                                        placeholder="Task Name"
                                        value={newTask}
                                        onChange={(e) => setNewTask(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder='Short Description'
                                        value={taskDescription}
                                        onChange={(e) => setTaskDescription(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl>
                                    <Input
                                        type="date"
                                        value={taskDate}
                                        onChange={(e) => setTaskDate(e.target.value)}
                                        placeholder="Select Date"
                                    />
                                </FormControl>

                                <FormControl>
                                    <Input
                                        type="time"
                                        value={taskTime}
                                        onChange={(e) => setTaskTime(e.target.value)}
                                        placeholder="Select Time"
                                    />
                                </FormControl>

                                <Button type="submit">Add Task</Button>
                                <Button type="button" onClick={handleCancelClick}>Cancel</Button>
                            </Flex>
                        </form>
                    </Box>
                )}
                <Box as="ul" >
                    {activeList.tasks
                        .map((task, index) => ({ task, index }))
                        .filter(({ task }) => !task.completed)
                        .map(({ task, index }) => (
                            <Flex as="li" key={index} alignItems="center">
                                <Box onClick={() => toggleTaskCompletion(index)} cursor="pointer">
                                    <Icon
                                        name={task.completed ? 'bxs-circle' : 'bx-circle'}
                                        className="task-circle-icon"
                                    />
                                </Box>
                                
                                <Flex direction='column' ml="10px">
                                    <Text>{task.task}</Text>
                                    {task.date && (
                                        <Text fontSize="sm" color="gray.500">
                                            Date: {task.date} {task.time && `Time: ${task.time}`}
                                        </Text>
                                    )}
                                </Flex>

                                {/* <Text ml="10px">{task.task}</Text> */}
                                
                                <Flex ml="auto" gap="10px" alignItems="center">
                                    <Box
                                        ml="auto"
                                        onClick={() => deleteTask(index)}
                                        cursor={'pointer'}
                                    >
                                        <Icon name="bx-trash" className="favorite-icon" />
                                    </Box>
                                    
                                    <Box
                                        ml="auto"
                                        onClick={() =>
                                            task.favorite
                                                ? removeFromFavorites(task)
                                                : addToFavorites(task, selectedTabIndex)
                                        }
                                        cursor={'pointer'}
                                    >
                                        <Icon
                                            name={task.favorite ? 'bxs-star' : 'bx-star'}
                                            className="favorite-icon"
                                        />
                                    </Box>
                                </Flex>
                            </Flex>
                        ))}
                </Box>
            </Box>

            <Box className="completed-tasks">
                <Flex
                    onClick={() => setCompletedVisible((prev) => !prev)}
                    justifyContent="space-between"
                >
                    <Text>Completed ({completedCount})</Text>
                    <Icon name={completedVisible ? 'bxs-chevron-down' : 'bxs-chevron-right'} />
                </Flex>
                {completedVisible && (
                    <Box as="ul">
                        {activeList.tasks
                            .map((task, index) => ({ task, index }))
                            .filter(({ task }) => task.completed)
                            .map(({ task, index }) => (
                                <Flex as="li" key={index} alignItems="center">
                                    <Icon name="bx-check-circle" className="completed-icon" />
                                    <Text
                                        ml="10px"
                                        textDecoration="line-through"
                                        color="gray.500"
                                        onClick={() => toggleTaskCompletion(index)}
                                        cursor="pointer"
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
