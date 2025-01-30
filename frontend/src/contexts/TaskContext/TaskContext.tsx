import { useState, createContext, useContext, useEffect } from 'react';
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
    allTasks: Task[];
};
export type Task = {
    _id: string;
    task_name: string;
    is_favorite: boolean;
    is_completed: boolean;
    due_date: string;
    description: string;
    task_list_id: string;
    created_at: Date;
    updated_at: Date;
};

export type BackendTaskList = {
    _id: string;
    task_list_name: string;
    user_id: string;
    isInitialList: boolean;
    created_at: Date;
    updated_at: Date;
};

export type TaskList = {
    _id: string;
    task_list_name: string;
    tasks: Task[];
    type: 'default' | 'ordinary';
};

const TaskContext = createContext<TaskContextType | null>(null);

const TaskProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const { client } = useBackendAPIContext();
    const [taskLists, setTaskLists] = useState<TaskList[]>([]);
    const [notification, setNotification] = useState<string | null>(null);
    const allTasks = taskLists.map((taskList) => taskList.tasks).flat();
    const showNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    const fetchTaskLists = async () => {
        try {
            const res = await client.get('/task-lists/get');
            const backendTaskLists: BackendTaskList[] = res.data.taskLists;

            // Fetch all tasks for each task list in parallel
            const taskListsWithTasks = await Promise.all(
                backendTaskLists.map(async (taskList) => {
                    try {
                        const taskRes = await client.get(
                            `/task-lists/tasks/${taskList._id}`
                        );
                        const tasks: Task[] = taskRes.data.tasks || [];
                        return {
                            _id: taskList._id,
                            task_list_name: taskList.task_list_name,
                            tasks,
                            type: taskList.isInitialList
                                ? 'default'
                                : 'ordinary',
                        } as TaskList;
                    } catch (error) {
                        console.error(
                            `Error fetching tasks for task list ${taskList._id}:`,
                            error
                        );
                        return {
                            _id: taskList._id,
                            task_list_name: taskList.task_list_name,
                            tasks: [],
                            type: taskList.isInitialList
                                ? 'default'
                                : 'ordinary',
                        } as TaskList;
                    }
                })
            );
            setTaskLists(taskListsWithTasks);
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
                allTasks,
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
