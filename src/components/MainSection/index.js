import useTask from '../../contexts/useTask';
import TaskLine from './TaskLine';
import { CheckIcon, PlusIcon } from '../../icons';

const AddTaskButton = () => {
  return (
    <div className='flex flex-row'>
      <span className='mr-3'><PlusIcon /></span>
      <div>Add Task</div>
    </div>
  );
}

const Container = () => {
  const { tasks } = useTask();
  return (
    <div>
      <div className='max-w-screen-lg mx-auto'>
        { tasks.map(task => <TaskLine key={task.id} task={task} />) }
        <AddTaskButton />
      </div>
    </div>
  );
};

export default Container;