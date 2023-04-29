import { createContext, useContext, useState, useEffect } from 'react';
import { getTasksByUserId } from '../api';

const TaskContext = createContext({});

export const TaskProvider = ({children}) => {
  const [tasks, setTasks] = useState([]);

  async function fetchData() {
    const tasks = await getTasksByUserId(1);
    setTasks(tasks);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const getTaskById = id => tasks.find(task => task.id === id);
  const addTask = (task) => setTasks([...tasks, {...task, id: tasks[tasks.length-1].id + 1, completed: false}]);

  const value = {
    tasks,
    getTaskById,
    addTask
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
};

export default function useTask() {
  return useContext(TaskContext);
}