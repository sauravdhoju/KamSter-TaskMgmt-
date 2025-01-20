import React, { useEffect, useState } from 'react';
import { Image, Box } from '@chakra-ui/react';
import { useCalendarContext } from '../../contexts/CalendarContext/CalendarContext';
import TasksList from '../../components/TasksList/TasksList';
import MonthGrid from '../../components/MonthGrid/MonthGrid';
import './Home.scss';
import PageContainer from '../../components/PageContainer/PageContainer';
import { lastDayOfMonth } from 'date-fns';
import { useBackendAPIContext } from '../../contexts/BackendAPIContext/BackendAPIContext';

const Home: React.FC = () => {
    const { client } = useBackendAPIContext();
    const { currentViewDate } = useCalendarContext();
    const months3L: (
        | 'Jan'
        | 'Feb'
        | 'Mar'
        | 'Apr'
        | 'May'
        | 'Jun'
        | 'Jul'
        | 'Aug'
        | 'Sep'
        | 'Oct'
        | 'Nov'
        | 'Dec'
    )[] = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    const [taskLists, setTaskLists] = useState([]);
    const [taskCounts, setTaskCounts] = useState({
        totalTasks: 0,
        ongoingTasks: 0,
        completedTasks: 0,
        overdueTasks: 0,
    });

    const fetchTaskLists = async () => {
        try {
            client.get('/task-lists/get').then((res) => {
                setTaskLists(res.data.taskLists);
            }); // Update with your endpoint for task lists
        } catch (error) {
            console.error(error);
        }
    };
    const fetchTasks = async (id: string) => {
        try {
            client.get(`task-lists/tasks/${id}/`).then((res) => {
                setTaskCounts((prev) => {
                    return {
                        ...prev,
                        totalTasks: prev.totalTasks + res.data.tasks.length,
                    };
                });
            }); // Update with your endpoint for task lists
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch task lists and then tasks from each list
    useEffect(() => {
        fetchTaskLists();
    }, []);

    useEffect(() => {
        if (taskLists.length > 0) {
            taskLists.map(async (taskList: { _id: string }) => {
                fetchTasks(taskList._id);
            });
        }
    }, taskLists);

    return (
        <PageContainer>
            <div className='home-container'>
                <section className='task-section'>
                    <Box className='task-header' position={'relative'}>
                        <Box
                            className='task-picture'
                            position={'absolute'}
                            right={0}
                            bottom={0}
                            zIndex={'99'}
                        >
                            <Image
                                src={'taskerDoodle.jpg'}
                                alt='task-photo'
                                className='tasker-img'
                            />
                        </Box>
                        <Box className='task-header-text-container'>
                            <Box className='task-text'>
                                <h2>Today Task</h2>
                                <p>Check your daily tasks and schedules</p>
                            </Box>
                            <Box className='buttons'>
                                <button className='schedule-btn'>
                                    Today's Schedule
                                </button>
                                <button className='add-btn'>Add Task</button>
                            </Box>
                        </Box>
                    </Box>

                    <div className='task-status-container'>
                        <div className='task-item'>
                            <p>Total Tasks</p>
                            <h3>{taskCounts.totalTasks}</h3>
                        </div>
                        <div className='task-item'>
                            <p>Ongoing Tasks</p>
                            <h3>{taskCounts.ongoingTasks}</h3>
                        </div>
                        <div className='task-item'>
                            <p>Completed Tasks</p>
                            <h3>{taskCounts.completedTasks}</h3>
                        </div>
                        <div className='task-item'>
                            <p>Overdue Tasks</p>
                            <h3>{taskCounts.overdueTasks}</h3>
                        </div>
                    </div>

                    <div className='future-container'>
                        <Box
                            bgColor={'#fff'}
                            padding={'10px'}
                            borderRadius={'10px'}
                            boxShadow={'0 0 5px 2px #d6d2d6'}
                        >
                            <TasksList />
                        </Box>

                        <Box className='calendar'>
                            <MonthGrid
                                associatedDate={
                                    new Date(
                                        currentViewDate.getFullYear(),
                                        currentViewDate.getMonth(),
                                        1
                                    )
                                }
                                monthName={months3L[currentViewDate.getMonth()]}
                                numberOfDays={lastDayOfMonth(
                                    currentViewDate
                                ).getDate()}
                            />
                        </Box>
                    </div>
                </section>
            </div>
        </PageContainer>
    );
};

export default Home;
