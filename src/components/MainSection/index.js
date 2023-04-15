import useTask from '../../contexts/useTask';
import useSection from '../../contexts/useSection';
import TaskLine from './TaskLine';
import { PlusIcon } from '../../icons';

const AddTaskButton = () => (
  <div
    className={`flex flex-row ml-2 mt-2 text-gray-500 font-light hover:text-[#ff0000] cursor-pointer`}
  >
    <span className='mr-3'><PlusIcon /></span>
    <div className='select-none'>Add Task</div>
  </div>
);

const Section = ({ section }) => {
  const { tasks } = useTask();
  const filterCb = section === 'unsectioned' ? task => !task.sectionId : task => task.sectionId === section.id;

  return (
    <div className='mb-10 relative'>
      <h4 className='pb-2 border-b border-gray-200 font-bold mr-4'>{ section.title }</h4>
      { tasks.filter(filterCb).map(task => <TaskLine key={task.id} task={task} />) }
      <AddTaskButton />
    </div>
  );
};

const Container = () => {
  const { sections } = useSection();
  return (
    <div className='ml-2 overflow-y-scroll'>
      <div className='max-w-screen-lg mx-auto'>
        <h2 className='font-bold text-xl'>Inbox</h2>
        { ['unsectioned', ...sections].map(section => (<Section section={section} />)) }
      </div>
    </div>
  );
};

export default Container;