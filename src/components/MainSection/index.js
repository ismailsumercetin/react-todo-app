import { useState } from 'react';
import useTask from '../../contexts/useTask';
import useSection from '../../contexts/useSection';
import TaskLine from './TaskLine';
import { PlusIcon } from '../../icons';
import AddTaskManager from './AddTaskManager';

const AddTaskButton = ({ showTaskManager }) => (
  <div
    className={`flex flex-row mt-2 text-gray-500 font-light hover:text-[#ff0000] cursor-pointer`}
    onClick={showTaskManager}
  >
    <span className='mr-3'><PlusIcon /></span>
    <div className='select-none'>Add Task</div>
  </div>
);

const Section = ({ section, setActiveTaskManager, activeTaskManager }) => {
  const { tasks } = useTask();
  const filterCb = section.id === 'unsectioned' ? task => !task.sectionId : task => task.sectionId === section.id;

  return (
    <div className='mb-10 relative'>
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
  );
};

const Container = () => {
  const { sections } = useSection();
  const [activeTaskManager, setActiveTaskManager] = useState(); // section id
  return (
    <div className='mx-16'>
      <div className='max-w-4xl mx-auto overflow-y-scroll'>
        <h2 className='font-bold text-xl'>Inbox</h2>
        { sections.map(section => (
            <Section
              section={section}
              setActiveTaskManager={sid => setActiveTaskManager(sid)}
              activeTaskManager={activeTaskManager}
            />
          )
        ) }
      </div>
    </div>
  );
};

export default Container;