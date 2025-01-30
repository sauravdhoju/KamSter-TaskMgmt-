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

const initialTaskLists = [
    {
        name: 'Favorite',
        tasks: [],
        type: 'default',
    },
    {
        name: 'My Lists',
        tasks: [{ 
            task: 'Hanging', 
            completed: false, 
            favorite: false, 
            description: '',
            date: '',
            time: '',
        }],
        type: 'ordinary',
    },
    // {
    //     name: 'Grocery',
    //     tasks: [{ 
    //         task: 'Potato', 
    //         completed: false, 
    //         favorite: false, 
    //         description: '',
    //         date: '',
    //         time: '', 
    //     }],
    //     type: 'ordinary',
    // },
];

const TasksList = () => {
    const [taskLists, setTaskLists] = useState(initialTaskLists);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [newListVisible, setNewListVisible] = useState(false);
    const [newListName, setNewListName] = useState('');
    const [completedVisible, setCompletedVisible] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);
    
    // const [isMoreOptionVisible, setIsMoreOptionVisible] = useState(false);
    const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);
    const [isBackgroundDimmed, setIsBackgroundDimmed] = useState(false);

    const [newTask, setNewTask] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskTime, setTaskTime] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const activeList = taskLists[selectedTabIndex] || { name: '', tasks: [] };
    const completedCount = activeList.tasks.filter((task) => task.completed).length;
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    
    interface Task{
        task: string;
        favorite: boolean;
        completed: boolean;
        date: string;
        time: string;
        description: string;
    }

    const openTaskDetails = (task: Task) => {
        console.log("Opening");
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
    }

    return (
        <Box className="tasks-list" width="100%" cursor="pointer">
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
                <form className="new-list-form">
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

            {/* Task List */}
            <Box className="task-list">
                <Flex className="list-header">
                    <Text>{activeList.name}</Text>

                    <Flex className="list-actions" gap="10px">
                        {/* add task icon */}
                        <Box
                            className="add-task-icon-container"
                            cursor="pointer"
                            onClick={handleAddTaskClick}
                        >
                            <Icon 
                                name='bx-plus-circle'
                                aria-label='Add Task'
                            />
                        </Box>

                        <Menu>
                            <MenuButton>
                                <Icon name="bx-dots-vertical-rounded" />
                            </MenuButton>
                            <MenuList>
                                <MenuItem >
                                    <Icon name="bx-edit" />
                                    <Text>Rename</Text>
                                </MenuItem>

                                <MenuItem>
                                    <Icon name="bx-trash" />
                                    <Text>Delete</Text>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
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
                        <form >
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
                                <Button type="button"  onClick={handleCancelClick}>Cancel</Button>
                            </Flex>
                        </form>
                    </Box>
                )}
                <Box as="ul" >
                    {activeList.tasks
                        .map((task, index) => ({ task, index }))
                        .filter(({ task }) => !task.completed)
                        .map(({ task, index }) => (
                            <Flex 
                                as="li" 
                                key={index} 
                                alignItems="center"
                                onClick={() => {
                                    // console.log("Clicked me");
                                    openTaskDetails(task)
                                }} 
                                cursor="pointer"
                            >
                                <Box 
                                    cursor="pointer"
                                >
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
                                        cursor={'pointer'}
                                    >
                                        <Icon name="bx-trash" className="favorite-icon" />
                                    </Box>
                                    
                                    <Box
                                        ml="auto"
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
                {/* <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Task Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedTask && (
                            <Box>
                                <Text><strong>Task:</strong> {selectedTask.task}</Text>
                                <Text><strong>Description:</strong> {selectedTask.description || 'No description'}</Text>
                                <Text><strong>Date:</strong> {selectedTask.date || 'N/A'}</Text>
                                <Text><strong>Time:</strong> {selectedTask.time || 'N/A'}</Text>
                                <Text><strong>Favorite:</strong> {selectedTask.favorite ? 'Yes' : 'No'}</Text>
                                <Text><strong>Completed:</strong> {selectedTask.completed ? 'Yes' : 'No'}</Text>
                            </Box>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={closeModal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
                </Modal> */}
            </Box>

            <Box className="completed-tasks">
                <Flex
                    onClick={() => setCompletedVisible((prev) => !prev)}
                    justifyContent="space-between"
                    cursor="pointer"
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
                                <Flex 
                                    as="li" 
                                    key={index} 
                                    alignItems="center"
                                    >
                                    <Icon name="bx-check-circle" className="completed-icon" />
                                    <Text
                                        ml="10px"
                                        textDecoration="line-through"
                                        color="gray.500"
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