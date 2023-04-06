import TaskManager from './TaskManager.tsx';

const Main = ({ tasks }) => {
  return (
    <div className="main bg-amber-300">
      <TaskManager tasks={tasks}/>
    </div>
  );
};

export default Main;