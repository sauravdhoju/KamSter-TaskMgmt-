import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Box } from '@chakra-ui/react';
import { useCalendarContext } from '../../contexts/CalendarContext/CalendarContext';
import TasksList from '../../components/TasksList/TasksList';
import MonthGrid from '../../components/MonthGrid/MonthGrid';
import './Home.scss';
import PageContainer from '../../components/PageContainer/PageContainer';
import { lastDayOfMonth } from 'date-fns';
import { useBackendAPIContext } from '../../contexts/BackendAPIContext/BackendAPIContext';
import { useUserContext } from '../../contexts/UserContext/UserContext';

const Home: React.FC = () => {
    const { client } = useBackendAPIContext();
    const { user } = useUserContext();
    const navigate = useNavigate();
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
            });
        } catch (error) {
            console.error(error);
        }
    };

    interface Task {
        is_completed: boolean;
        due_date: string;
    }

    const fetchTasks = async (id: string) => {
        try {
            client.get(`task-lists/tasks/${id}/`).then((res) => {
                const tasks: Task[] = res.data.tasks;
                const currentDate = new Date();

                const ongoingTasks = tasks.filter(
                    (task) => !task.is_completed
                ).length;
                const completedTasks = tasks.filter(
                    (task) => task.is_completed
                ).length;
                const totalTasks = tasks.length;

                const overdueTasks = tasks.filter(
                    (task) =>
                        !task.is_completed &&
                        new Date(task.due_date) < currentDate
                ).length;

                setTaskCounts((prev) => ({
                    ...prev,
                    totalTasks: prev.totalTasks + totalTasks,
                    ongoingTasks: prev.ongoingTasks + ongoingTasks,
                    completedTasks: prev.completedTasks + completedTasks,
                    overdueTasks: prev.overdueTasks + overdueTasks,
                }));
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddTaskClick = () => {
        console.log('Add Task Clicked');
    };

    useEffect(() => {
        if (!user) navigate('/login');
        fetchTaskLists();
    }, []);

    useEffect(() => {
        if (taskLists.length > 0) {
            taskLists.forEach(async (taskList: { _id: string }) => {
                fetchTasks(taskList._id);
            });
        }
    }, [taskLists.length]);

    return (
        <>
            {user ? (
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
                                        <p>
                                            Check your daily tasks and schedules
                                        </p>
                                    </Box>
                                    <Box className='buttons'>
                                        <button className='schedule-btn'>
                                            Today's Schedule
                                        </button>
                                        <button
                                            className='add-btn'
                                            onClick={handleAddTaskClick}
                                        >
                                            Add Task
                                        </button>
                                    </Box>
                                </Box>
                            </Box>

                            <div className='task-status-container'>
                                <div className='task-item'>
                                    <p>Total Tasks</p>
                                    <h3>{taskCounts.totalTasks}</h3>
                                </div>
                                <div className='task-item'>
                                    <p>Incomplete Tasks</p>
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
                                        monthName={
                                            months3L[currentViewDate.getMonth()]
                                        }
                                        numberOfDays={lastDayOfMonth(
                                            currentViewDate
                                        ).getDate()}
                                    />
                                </Box>
                            </div>
                        </section>
                    </div>
                </PageContainer>
            ) : (
                <Box
                    bgColor={'#fff'}
                    padding={'10px'}
                    borderRadius={'10px'}
                    boxShadow={'0 0 5px 2px #d6d2d6'}
                    width={'100%'}
                    height={'100vh'}
                >
                    <TasksList />
                </Box>
            )}{' '}
        </>
    );
};

export default Home;
