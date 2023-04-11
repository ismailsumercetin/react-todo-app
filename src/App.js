import Main from './components/MainSection';
import Sidebar from './components/Sidebar';
import { TaskProvider } from './contexts/useTask';

function App() {
  return (
    <TaskProvider>
      <div className="App grid grid-cols-[200px_1fr] h-screen">
        <Sidebar />
        <Main />
      </div>
    </TaskProvider>
  );
}

export default App;
