import Main from './components/MainSection/index.tsx';
import Sidebar from './components/Sidebar.tsx';
import TASKS from './mockdata/index.ts';
import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState(TASKS);
  return (
    <div className="App grid grid-cols-[200px_1fr] h-screen">
      <Sidebar />
      <Main
        tasks={tasks}
        setTasks={updatedTasks => setTasks(updatedTasks)}
      />
    </div>
  );
}

export default App;
