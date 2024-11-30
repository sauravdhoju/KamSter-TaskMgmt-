import axios from 'axios';
import { Image, Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import HeaderGreet from '../../components/HeaderGreet/HeaderGreet';
import TasksList from '../../components/TasksList/TasksList';
import MonthGrid from '../../components/MonthGrid/MonthGrid';
import './Home.scss';
import PageContainer from '../../components/PageContainer/PageContainer';
import taskPhoto from '../../pages/Home/picture.jpg';

const baseUrl = 'http://localhost:8080';

const Home: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(
        new Date().toLocaleTimeString()
    );
    const [currentDate, setCurrentDate] = useState(new Date());

    const totalTasks = 32;
    const ongoingTasks = 32;
    const completedTasks = 32;
    const overdueTasks = 32;

    useEffect(() => {
        axios
            .get<{ message: string }>(`${baseUrl}/whatistoday`, {
                withCredentials: true,
            })
            .then((res) => console.log(res.data.message))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        const updateDate = () => {
            setCurrentDate(new Date());
        };

        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        const timeToMidnight = midnight.getTime() - new Date().getTime();

        const dateTimer = setTimeout(() => {
            updateDate();
            setInterval(updateDate, 24 * 60 * 60 * 1000);
        }, timeToMidnight);

        return () => {
            clearInterval(timer);
            clearTimeout(dateTimer);
        };
    }, []);

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const formattedDate = currentDate.toLocaleDateString(undefined);

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
                                src={taskPhoto}
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
                            {/* <p className="all-label">All</p> */}
                            <h3>{totalTasks}</h3>
                            {/* <span className="percent-change">10% ↑</span> */}
                        </div>
                        <div className='task-item'>
                            <p>Ongoing Tasks</p>
                            {/* <p className="all-label">All</p> */}
                            <h3>{ongoingTasks}</h3>
                        </div>
                        <div className='task-item'>
                            <p>Completed Tasks</p>
                            {/* <p className="all-label">All</p> */}
                            <h3>{completedTasks}</h3>
                        </div>
                        <div className='task-item'>
                            <p>Overdue Tasks</p>
                            {/* <p className="all-label">All</p> */}
                            <h3>{overdueTasks}</h3>
                        </div>
                    </div>

                    <div className='future-container'>
                        {/* <div className='upcoming-tasks'>
                            <h3>Upcoming Tasks: </h3>
                        </div> */}
                        <Box
                            bgColor={'#fff'}
                            padding={'10px'}
                            borderRadius={'10px'}
                            boxShadow={'0 0 5px 2px #d6d2d6'}
                        >
                            <TasksList />
                        </Box>

                        <Box className='calendar'>
                            {/* <h4>
                                {currentDate.toLocaleString('default', {
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </h4>
                            <div className='calendar-grid'>
                                <div className='day'>Sun</div>
                                <div className='day'>Mon</div>
                                <div className='day'>Tue</div>
                                <div className='day'>Wed</div>
                                <div className='day'>Thu</div>
                                <div className='day'>Fri</div>
                                <div className='day'>Sat</div>
                                {[...Array(31)].map((_, i) => (
                                    <div key={i} className='date'>
                                        {i + 1}
                                    </div>
                                ))}
                            </div> */}
                            <MonthGrid
                                monthName='Dec'
                                startingDay={2}
                                numberOfDays={31}
                            />
                        </Box>
                    </div>
                </section>
            </div>
        </PageContainer>
    );
};

export default Home;
