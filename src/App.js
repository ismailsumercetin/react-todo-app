import Main from './components/MainSection';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App grid grid-cols-[200px_1fr] h-screen">
      <Sidebar />
      <Main />
    </div>
  );
}

export default App;
