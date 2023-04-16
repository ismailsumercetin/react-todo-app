import { createContext, useContext, useState } from 'react';
import { TASKS } from '../mockdata';

const TaskContext = createContext({});

export const TaskProvider = ({children}) => {
  const [tasks, setTasks] = useState(TASKS);

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