import { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Input,
    Button,
} from '@chakra-ui/react';
import Icon from '../Icon/Icon';
import './TasksList.scss';
const taskLists = [
    {
        name: 'importants',
        tasks: [
            {
                task: 'to go to go',
                completed: false,
            },
            {
                task: 'to go to go',
                completed: false,
            },
            {
                task: 'to go to go',
                completed: false,
            },
            {
                task: 'to go to go',
                completed: true,
            },
        ],
        type: 'default',
    },
    {
        name: 'My Lists',
        tasks: [
            {
                task: 'hehehe',
                completed: false,
            },
            {
                task: 'bee yatch',
                completed: false,
            },
            {
                task: 'to go to go',
                completed: false,
            },
            {
                task: 'to go to go',
                completed: true,
            },
        ],
        type: 'ordinary',
    },
    {
        name: 'travel',
        tasks: [
            {
                task: 'to go to go',
                completed: false,
            },
            {
                task: 'travel travel travel',
                completed: false,
            },
            {
                task: 'to go to go',
                completed: false,
            },
            {
                task: 'to go to go',
                completed: true,
            },
            {
                task: 'togotogo',
                completed: true,
            },
            {
                task: 'fuuuuuuuccccckkkk',
                completed: true,
            },
            {
                task: 'to go to go',
                completed: true,
            },
        ],
        type: 'ordinary',
    },
    {
        name: 'grocery',
        tasks: [
            {
                task: 'to go to go',
                completed: false,
            },
            {
                task: 'to go to go',
                completed: false,
            },
            {
                task: 'to go to go',
                completed: false,
            },
            {
                task: 'to go to go',
                completed: true,
            },
        ],
        type: 'ordinary',
    },
    {
        name: 'food',
        tasks: [
            {
                task: 'to go to go',
                completed: false,
            },
            {
                task: 'to go to go',
                completed: false,
            },
            {
                task: 'to go to go',
                completed: false,
            },
            {
                task: 'to go to go',
                completed: true,
            },
        ],
        type: 'ordinary',
    },
];
const TasksList = () => {
    const [tabList, setTabList] = useState(taskLists);
    const [selectedTabIndex, setSelectedTabIndex] = useState(1);
    const [addNewList, setAddNewList] = useState(false);
    const [newListName, setNewListName] = useState('');
    const handleCompletedCountUpdate = () => {
        let completed = 0;
        tabList[selectedTabIndex].tasks.map((task) => {
            if (task.completed) ++completed;
        });
        return completed;
    };
    const [completedCount, setCompletedCount] = useState(() =>
        handleCompletedCountUpdate()
    );
    const [completedListVisible, setCompletedListVisible] = useState(false);

    const handleNewList = () => {
        setAddNewList((prevState) => !prevState);
    };

    const handleNewListFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(newListName + ' added as new list!');
        const newTab = {
            name: newListName,
            tasks: [],
            type: 'ordinary',
        };

        setTabList((prevList) => [...prevList, newTab]);
        setSelectedTabIndex(tabList.length); // added at end so the current length will be index for new tab
        setAddNewList(false);
        setNewListName('');
    };

    const handleBackgroundClick = () => {
        setAddNewList((prevState) => !prevState);
    };

    useEffect(() => {
        setCompletedCount(handleCompletedCountUpdate);
    }, [selectedTabIndex]);

    return (
        <Box className='tasks-list' width={'100%'}>
            <Flex
                width={'100%'}
                maxW={'100%'}
                className='tabs-container'
                borderBottom={'1px solid #00000080'}
                flexDir={'row'}
                alignItems={'center'}
                gap={'20px'}
                userSelect={'none'}
            >
                {tabList.map((taskList, index) => {
                    return (
                        <Box
                            key={index}
                            className={`tasks-tab ${
                                selectedTabIndex === index
                                    ? 'tasks-tab-selected'
                                    : ''
                            }`}
                            onClick={() => setSelectedTabIndex(index)}
                        >
                            {taskList.type === 'default' ? (
                                <Icon
                                    name='bxs-star'
                                    className='important-tasks-icon'
                                />
                            ) : (
                                <Text>{taskList.name}</Text>
                            )}
                        </Box>
                    );
                })}
                <Flex
                    id='new-list-button'
                    className='tasks-tab new-list-btn-tab'
                    flexDir={'row'}
                    onClick={handleNewList}
                >
                    <Icon
                        name='bx-plus'
                        className='tab-icon add-list-btn-icon'
                    />
                    <Text>New List</Text>
                </Flex>
            </Flex>
            {addNewList ? (
                <form
                    onSubmit={handleNewListFormSubmit}
                    className='new-list-form'
                >
                    <FormControl className='new-list-input-container'>
                        <span
                            className='click-detector'
                            onClick={handleBackgroundClick}
                        ></span>
                        <FormLabel htmlFor='newListInput' display={'none'}>
                            New List Name
                        </FormLabel>
                        <Input
                            type='text'
                            value={newListName}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setNewListName(e.target.value)}
                            className='new-list-input'
                            name='newListInput'
                            required
                            autoFocus
                        />
                    </FormControl>
                    <Button
                        type='submit'
                        bgColor={'powderblue'}
                        className='new-list-add-btn'
                    >
                        <Icon name='bx-plus' />
                    </Button>
                </form>
            ) : (
                <>
                    {' '}
                    <Box
                        className='todo-list-container'
                        as='ul'
                        minH={'120px'}
                        bgColor={'red'}
                        marginTop={'20px'}
                    >
                        {/* yeta vitra chai tero tyo task add garne button tyo tinta dot wala btn hunu paryo */}
                        {tabList[selectedTabIndex].tasks.map((task, index) => {
                            if (!task.completed) {
                                return <li key={index}>{task.task}</li>;
                            }
                        })}
                    </Box>
                    <Box
                        className='completed-list-container'
                        marginTop={'20px'}
                    >
                        <Box
                            className='list-display-toggle-container'
                            borderBottom={'1px solid #00000080'}
                            display={'flex'}
                            justifyContent={'space-between'}
                            onClick={() =>
                                setCompletedListVisible(
                                    (prevState) => !prevState
                                )
                            }
                        >
                            <Text>Completed {completedCount}</Text>
                            {completedListVisible ? (
                                <Icon
                                    name='bx-down-arrow'
                                    className='toggle-completed-icon'
                                />
                            ) : (
                                <Icon
                                    name='bx-right-arrow'
                                    className='toggle-completed-icon'
                                />
                            )}
                        </Box>
                        {completedListVisible && (
                            <Box className='completed-list' as='ul'>
                                {tabList[selectedTabIndex].tasks.map(
                                    (task, index) => {
                                        if (task.completed) {
                                            return (
                                                <li key={index}>{task.task}</li>
                                            );
                                        }
                                    }
                                )}
                            </Box>
                        )}
                    </Box>
                </>
            )}
        </Box>
    );
};

export default TasksList;
