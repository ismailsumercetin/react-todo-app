import { useState } from 'react';
import useTask from '../../contexts/useTask';
import useSection from '../../contexts/useSection';
import TaskLine from './TaskLine';
import { PlusIcon, MoreIcon } from '../../icons';
import AddTaskManager from './AddTaskManager';
import AddSectionManager from './AddSectionManager';

const AddTaskButton = ({ showTaskManager }) => (
  <div
    className={`flex flex-row mt-2 text-gray-500 font-light hover:text-[#ff0000] cursor-pointer`}
    onClick={showTaskManager}
  >
    <span className='mr-3'><PlusIcon /></span>
    <div className='select-none'>Add Task</div>
  </div>
);

const Section = ({ index, section, setActiveTaskManager, activeTaskManager, toggleSectionManager, setToggleSectionManager }) => {
  const { tasks } = useTask();
  const filterCb = section.id === 'unsectioned' ? task => !task.sectionId : task => task.sectionId === section.id;

  return (
    <>
      <div className='relative'>
        <h4 className='pb-2 border-b border-gray-200 font-bold'>{ section.title }</h4>
        <div>
          { tasks.filter(filterCb).map(task => <TaskLine key={task.id} task={task} isAddTaskManagerOpened={activeTaskManager === section.id} />) }
        </div>
        { !activeTaskManager && <AddTaskButton showTaskManager={() => setActiveTaskManager(section.id)} /> }
        {
          activeTaskManager === section.id
            && <AddTaskManager
              close={() => setActiveTaskManager(null)}
              sectionId={section.id}
            />}
      </div>
      {
        <span
          className={`block text-red-600 overflow-hidden text-center ${toggleSectionManager !== null ? 'mt-6 mb-2 hover:opacity-0 cursor-auto' : 'my-6'} cursor-pointer opacity-0 hover:opacity-100 before:content-[''] after:content-['']
            before:inline-block after:inline-block before:h-px after:h-px before:relative after:relative before:align-middle after:align-middle
            before:w-1/2 after:w-1/2 before:bg-red-600 after:bg-red-600 before:right-3 before:ml-[-50%] after:left-3 after:mr-[-50%]`}
            onClick={() => setToggleSectionManager(index)}
        >
          Add Section
        </span>
      }
      { toggleSectionManager === index && <AddSectionManager close={() => setToggleSectionManager(null)} /> }
    </>
  );
};

const Header = () => {
  return (
    <div className='flex flex-row justify-between cursor-pointer'>
      <h2 className='font-bold text-xl'>Inbox</h2>
      <MoreIcon className='w-6' />
    </div>
  );
};

const Container = () => {
  const { sections } = useSection();
  const [activeTaskManager, setActiveTaskManager] = useState();
  const [toggleSectionManager, setToggleSectionManager] = useState(null);

  return (
    <div className='mx-16 mt-8'>
      <div className='max-w-4xl mx-auto overflow-y-scroll'>
        <Header />
        { sections.map((section, index) => (
            <Section
              index={index}
              section={section}
              setActiveTaskManager={sid => setActiveTaskManager(sid)}
              activeTaskManager={activeTaskManager}
              toggleSectionManager={toggleSectionManager}
              setToggleSectionManager={val => setToggleSectionManager(val)}
            />
          )
        ) }
      </div>
    </div>
  );
};

export default Container;