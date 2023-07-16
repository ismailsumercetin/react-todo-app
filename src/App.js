import Main from './components/MainSection';
import Sidebar from './components/Sidebar';
import { SectionProvider } from './contexts/useSection';
import { TaskProvider } from './contexts/useTask';
import { ProjectProvider } from './contexts/useProject';
import { UIProvider } from './contexts/useUI';
import ModalRenderer from './components/Modals/ModalRenderer';

function App() {
  return (
    <TaskProvider>
      <SectionProvider>
        <ProjectProvider>
          <UIProvider>
            <div className="App grid grid-cols-[300px_1fr] h-screen">
              <Sidebar />
              <Main />
              <ModalRenderer />
            </div>
          </UIProvider>
        </ProjectProvider>
      </SectionProvider>
    </TaskProvider>
  );
}

export default App;
