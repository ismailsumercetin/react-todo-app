import Main from './components/MainSection';
import Sidebar from './components/Sidebar';
import { SectionProvider } from './contexts/useSection';
import { TaskProvider } from './contexts/useTask';
import { ProjectProvider } from './contexts/useProject';

function App() {
  return (
    <TaskProvider>
      <SectionProvider>
        <ProjectProvider>
          <div className="App grid grid-cols-[300px_1fr] h-screen">
            <Sidebar />
            <Main />
          </div>
        </ProjectProvider>
      </SectionProvider>
    </TaskProvider>
  );
}

export default App;
