import Main from './components/MainSection';
import Sidebar from './components/Sidebar';
import { SectionProvider } from './contexts/useSection';
import { TaskProvider } from './contexts/useTask';

function App() {
  return (
    <TaskProvider>
      <SectionProvider>
        <div className="App grid grid-cols-[200px_1fr] h-screen">
          <Sidebar />
          <Main />
        </div>
      </SectionProvider>
    </TaskProvider>
  );
}

export default App;
