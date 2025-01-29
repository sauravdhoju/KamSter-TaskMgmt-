import { useState, createContext, useContext, useEffect } from 'react';
import Icon from '../../components/Icon/Icon';
import { useBackendAPIContext } from '../BackendAPIContext/BackendAPIContext';

type TaskContextType = {
    fetchTaskLists: () => {};
    taskLists: TaskList[];
    setTaskLists: React.Dispatch<
        React.SetStateAction<TaskContextType['taskLists']>
    >;
    notification: string | null;
    setNotification: React.Dispatch<
        React.SetStateAction<TaskContextType['notification']>
    >;
};
export type Task = {
    id: string;
    task: string;
    favorite: boolean;
    completed: boolean;
    due_date: string;
    time: string;
    description: string;
};

export type TaskList = {
    id: string;
    name: string;
    tasks: Task[];
    type: 'default' | 'ordinary';
};

const TaskContext = createContext<TaskContextType | null>(null);

const TaskProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const { client } = useBackendAPIContext();
    const [taskLists, setTaskLists] = useState<TaskList[]>([
        { id: 'favorites', name: 'Favorite', tasks: [], type: 'default' },
        { id: 'mylists', name: 'My Lists', tasks: [], type: 'default' },
    ]);
    const [notification, setNotification] = useState<string | null>(null);
    const showNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };
    const fetchTaskLists = async () => {
        try {
            const response = await client.get('/task-lists/get');
            const fetchedLists = response.data.taskLists.map((list: any) => ({
                id: list._id,
                name: list.task_list_name,
                tasks: [], // Placeholder, we'll fetch tasks separately
                type: 'ordinary',
            }));

            // Ensure the "Favorites" tab and "My Lists" tab are always at the top
            const favoritesList = {
                id: 'favorites',
                name: <Icon name='bxs-star' className='important-icon' />, // Star icon for Favorites
                tasks: [],
                type: 'default',
            };

            const myList = {
                id: 'mylists',
                name: 'My Lists', // My Lists tab, can hold all tasks added to it
                tasks: [], // This will hold tasks added specifically to "My Lists"
                type: 'default',
            };

            // Add both the "Favorites" and "My Lists" tabs before the fetched lists
            setTaskLists([favoritesList, myList, ...fetchedLists]);

            // Fetch tasks for each list
            for (const list of fetchedLists) {
                try {
                    const tasksResponse = await client.get(
                        `/task-lists/tasks/${list.id}`
                    );
                    const tasks = tasksResponse.data.tasks.map((task: any) => ({
                        id: task._id,
                        task: task.task_name,
                        favorite: task.is_important,
                        completed: task.is_completed,
                        date: task.date,
                        time: task.time,
                        description: task.description,
                    }));

                    setTaskLists((prev) => {
                        return prev.map((taskList) => {
                            if (taskList.id === 'favorites') {
                                // Add only favorite tasks to the "Favorites" tab
                                return {
                                    ...taskList,
                                    tasks: [
                                        ...taskList.tasks.filter(
                                            (existingTask) =>
                                                !tasks.some(
                                                    (task: Task) =>
                                                        task.id ===
                                                        existingTask.id
                                                )
                                        ), // Avoid duplicates
                                        ...tasks.filter(
                                            (task: Task) => task.favorite
                                        ), // Only important tasks
                                    ],
                                };
                            } else if (taskList.id === 'mylists') {
                                // Add tasks to the "My Lists" tab, even if they are not important
                                return {
                                    ...taskList,
                                    tasks: [
                                        ...taskList.tasks.filter(
                                            (existingTask) =>
                                                !tasks.some(
                                                    (task: Task) =>
                                                        task.id ===
                                                        existingTask.id
                                                )
                                        ), // Avoid duplicates
                                        ...tasks, // All tasks (important and not)
                                    ],
                                };
                            } else if (taskList.id === list.id) {
                                // Add non-favorite tasks to their respective lists
                                return {
                                    ...taskList,
                                    tasks: tasks.filter(
                                        (task: Task) => !task.favorite
                                    ), // Non-favorite tasks
                                };
                            }
                            return taskList;
                        });
                    });
                } catch (error) {
                    console.error(
                        `Error fetching tasks for list ${list.id}:`,
                        error
                    );
                    showNotification(
                        `Failed to fetch tasks for list "${list.name}".`
                    );
                }
            }
        } catch (error) {
            console.error('Error fetching task lists:', error);
            showNotification('Failed to load task lists.');
        }
    };

    useEffect(() => {
        fetchTaskLists();
    }, []);

    return (
        <TaskContext.Provider
            value={{
                fetchTaskLists,
                taskLists,
                setTaskLists,
                notification,
                setNotification,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

export default TaskProvider;
