import { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
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
    const [selectedTabIndex, setSelectedTabIndex] = useState(1);
    const handleCompletedCountUpdate = () => {
        let completedCount = 0;
        taskLists[selectedTabIndex].tasks.map((task) => {
            if (task.completed) ++completedCount;
        });
        return completedCount;
    };
    const [completedCount, setCompletedCount] = useState(
        handleCompletedCountUpdate()
    );
    const [completedListVisible, setCompletedListVisible] = useState(false);

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
                {taskLists.map((taskList, index) => {
                    return (
                        <Box
                            key={index}
                            className={`tasks-tab ${
                                selectedTabIndex === index
                                    ? 'tasks-tab-selected'
                                    : ''
                            }`}
                            onClick={() => {
                                setSelectedTabIndex(index);
                                setCompletedCount(handleCompletedCountUpdate());
                            }}
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
                >
                    <Icon
                        name='bx-plus'
                        className='tab-icon add-list-btn-icon'
                    />
                    <Text>New List</Text>
                </Flex>
            </Flex>
            <Box
                className='todo-list-container'
                as='ul'
                minH={'120px'}
                bgColor={'red'}
                marginTop={'20px'}
            >
                {taskLists[selectedTabIndex].tasks.map((task, index) => {
                    if (!task.completed) {
                        return <li key={index}>{task.task}</li>;
                    }
                })}
            </Box>
            <Box className='completed-list-container' marginTop={'20px'}>
                <Box
                    className='list-display-toggle-container'
                    borderBottom={'1px solid #00000080'}
                    display={'flex'}
                    justifyContent={'space-between'}
                    onClick={() =>
                        setCompletedListVisible((prevState) => !prevState)
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
                        {taskLists[selectedTabIndex].tasks.map(
                            (task, index) => {
                                if (task.completed) {
                                    return <li key={index}>{task.task}</li>;
                                }
                            }
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default TasksList;
