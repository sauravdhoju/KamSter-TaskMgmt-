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
    const [newTask, setNewTask] = useState('');

    const activeList = taskLists[selectedTabIndex] || { name: '', tasks: [] };
    const completedCount = activeList.tasks.filter((task) => task.completed).length;

    const showNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    const addToFavorites = (task, sourceListIndex) => {
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

    const removeFromFavorites = (task) => {
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
        setTaskLists((prev) =>
            prev.map((list, index) =>
                index === selectedTabIndex
                    ? { ...list, tasks: [...list.tasks, { task: newTask, completed: false, favorite: false }] }
                    : list
            )
        );
        setNewTask('');
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
                        onClick={() => setSelectedTabIndex(index)}
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

            {/* Task Input Form */}
            <form onSubmit={handleNewTaskSubmit} className="new-task-form">
                <Flex gap="10px">
                    <Input
                        placeholder="Add a new task"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <Button type="submit">Add</Button>
                </Flex>
            </form>

            {/* Task List */}
            <Box className="task-list">
                <Flex className="list-header">
                    <Text>{activeList.name}</Text>
                </Flex>
                <Box as="ul">
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
                                <Text ml="10px">{task.task}</Text>
                                <Box
                                    ml="auto"
                                    onClick={() =>
                                        task.favorite
                                            ? removeFromFavorites(task)
                                            : addToFavorites(task, selectedTabIndex)
                                    }
                                >
                                    <Icon
                                        name={task.favorite ? 'bxs-star' : 'bx-star'}
                                        className="favorite-icon"
                                    />
                                </Box>
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
