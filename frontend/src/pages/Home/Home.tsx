import axios from 'axios';
import React, { useState, useEffect } from 'react';
import HeaderGreet from '../../components/HeaderGreet/HeaderGreet';
import './Home.scss';
import PageContainer from '../../components/PageContainer/PageContainer';


const baseUrl = 'http://localhost:8080';

const Home: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [currentDate, setCurrentDate] = useState(new Date());

    const totalTasks = 32;
    const ongoingTasks = 32;
    const completedTasks = 32;
    const overdueTasks = 32;

    useEffect(() => {
        axios
            .get<{ message: string }>(`${baseUrl}/whatistoday`, { withCredentials: true })
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

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);

    return (
        <PageContainer>
        <div className="home-container">
            <section className="task-section">
                <div className="task-header">
                    <div className="task-text">
                        <h2>Today Task</h2>
                        <p>Check your daily tasks and schedules</p>
                    </div>
                    <div className="buttons">
                        <button className="schedule-btn">Today's Schedule</button>
                        <button className="add-btn">Add Task</button>
                    </div>
                </div>

                <div className="task-status-container">
                    <div className="task-item">
                        <p>Total Tasks</p>
                        <p className="all-label">All</p>
                        <h3>{totalTasks}</h3>
                        {/* <span className="percent-change">10% ↑</span> */}
                    </div>
                    <div className="task-item">
                        <p>Ongoing Tasks</p>
                        <p className="all-label">All</p>
                        <h3>{ongoingTasks}</h3>3
                    </div>
                    <div className="task-item">
                        <p>Completed Tasks</p>
                        <p className="all-label">All</p>
                        <h3>{completedTasks}</h3>
                    </div>
                    <div className="task-item">
                        <p>Overdue Tasks</p>
                        <p className="all-label">All</p>
                        <h3>{overdueTasks}</h3>
                    </div>
                </div>

                <div className="future-container">
                <div className="upcoming-tasks">
                    <h3>Upcoming Tasks: </h3>
                </div>
                
                <div className="calendar">
                    <h4>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h4>
                    <div className="calendar-grid">
                        <div className="day">Sun</div>
                        <div className="day">Mon</div>
                        <div className="day">Tue</div>
                        <div className="day">Wed</div>
                        <div className="day">Thu</div>
                        <div className="day">Fri</div>
                        <div className="day">Sat</div>
                        {[...Array(31)].map((_, i) => (
                            <div key={i} className="date">
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div></div>
            </section>
        </div>
        </PageContainer>
    );
};

export default Home;
