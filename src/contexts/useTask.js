import { createContext, useContext, useState, useEffect } from 'react';
import { getTasksByUserId, createTask } from '../api';

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
  const addTask = task => {
    setTasks([...tasks, task]);
    createTask(task.id, task);
  };
  const getNewOrderValue = sectionId => {
    const filterCb = sectionId ? task => task.sectionId === sectionId : task => !task.sectionId;
    const taskWithLastOrder = tasks.filter(filterCb).reduce((prev, cur) => (prev.order > cur.order) ? prev : cur, 0);
    return taskWithLastOrder.order ? taskWithLastOrder.order + 1 : 1;
  };

  const value = {
    tasks,
    getTaskById,
    addTask,
    getNewOrderValue
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
};

export default function useTask() {
  return useContext(TaskContext);
}