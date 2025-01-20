import React, { useEffect, useState } from 'react';
import { Image, Box } from '@chakra-ui/react';
import { useCalendarContext } from '../../contexts/CalendarContext/CalendarContext';
import TasksList from '../../components/TasksList/TasksList';
import MonthGrid from '../../components/MonthGrid/MonthGrid';
import './Home.scss';
import PageContainer from '../../components/PageContainer/PageContainer';
import { lastDayOfMonth } from 'date-fns';
import axios from 'axios';

const Home: React.FC = () => {
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
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const [taskCounts, setTaskCounts] = useState({
        totalTasks: 0,
        ongoingTasks: 0,
        completedTasks: 0,
        overdueTasks: 0,
    });

    // Fetch task lists and then tasks from each list
    useEffect(() => {
        const fetchTaskData = async () => {
            try {
                // Step 1: Fetch all task lists
                const taskListsResponse = await axios.get('/task-lists/get'); // Update with your endpoint for task lists
                if (taskListsResponse.status === 200) {
                    const taskLists = taskListsResponse.data; // Assuming it returns an array of task lists
                    const today = new Date();
                    let total = 0;
                    let ongoing = 0;
                    let completed = 0;
                    let overdue = 0;

                    // Step 2: For each task list, fetch tasks
                    for (const list of taskLists) {
                        const tasksResponse = await axios.get(`/task-lists/tasks/${list.id}`); // Update with your endpoint for tasks in a list
                        if (tasksResponse.status === 200) {
                            const tasks = tasksResponse.data; // Assuming it returns an array of tasks for the list

                            tasks.forEach((task) => {
                                // Total tasks count
                                total += 1;

                                // Ongoing tasks (scheduled for today)
                                if (new Date(task.date).toDateString() === today.toDateString()) {
                                    ongoing += 1;
                                }

                                // Completed tasks
                                if (task.is_completed) {
                                    completed += 1;
                                }

                                // Overdue tasks (tasks due before today and not completed)
                                if (new Date(task.date) < today && !task.is_completed) {
                                    overdue += 1;
                                }
                            });
                        }
                    }

                    setTaskCounts({
                        totalTasks: total,
                        ongoingTasks: ongoing,
                        completedTasks: completed,
                        overdueTasks: overdue,
                    });
                }
            } catch (error) {
                console.error('Error fetching task data:', error);
            }
        };

        fetchTaskData();
    }, []);

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
                                numberOfDays={lastDayOfMonth(currentViewDate).getDate()}
                            />
                        </Box>
                    </div>
                </section>
            </div>
        </PageContainer>
    );
};

export default Home;
