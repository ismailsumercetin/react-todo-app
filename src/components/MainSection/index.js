import { useState } from 'react';
import useTask from '../../contexts/useTask';
import useSection from '../../contexts/useSection';
import TaskLine from './TaskLine';
import { PlusIcon, MoreIcon } from '../../icons';
import AddTaskManager from './AddTaskManager';
import AddSectionManager from './AddSectionManager';

const AddTaskContainer = ({
  activeTaskManager,
  showTaskManager,
  closeTaskManager,
  section
}) => {
  if (!activeTaskManager) {
    // Add task button
    return (
      <div
        className={`flex flex-row mt-2 text-gray-500 font-light hover:text-[#ff0000] cursor-pointer`}
        onClick={showTaskManager}
      >
        <span className='mr-3'><PlusIcon /></span>
        <div className='select-none'>Add Task</div>
      </div>
    );
  }

  const selectedOnSection = section && activeTaskManager === section.id;
  const selectedOnUnsectioned = !section && activeTaskManager === 'unsectioned';
  if (selectedOnSection || selectedOnUnsectioned) {
    return (
      <AddTaskManager
        close={closeTaskManager}
        {...(selectedOnSection && { sectionId: section.id })}
      />
    );
  }
};

const Section = ({
  index,
  section,
  setActiveTaskManager,
  activeTaskManager,
  toggleSectionManager,
  setToggleSectionManager,
  tasks
}) => {
  return (
    <>
      <div className='relative'>
        <h4 className='pb-2 border-b border-gray-200 font-bold'>{ section.title }</h4>
        <div>
          { tasks }
        </div>
        <AddTaskContainer
          section={section}
          activeTaskManager={activeTaskManager}
          showTaskManager={() => setActiveTaskManager(section.id)}
          closeTaskManager={() => setActiveTaskManager()}
        />
      </div>
      <AddSectionContainer toggleSectionManager={toggleSectionManager} setToggleSectionManager={setToggleSectionManager} index={index} />
    </>
  );
};

const Unsection = ({ tasks, activeTaskManager, showTaskManager, closeTaskManager, toggleSectionManager, setToggleSectionManager }) => {
  return (
    <>
      <div className='relative'>
        <div>{ tasks }</div>
        <AddTaskContainer
          activeTaskManager={activeTaskManager}
          showTaskManager={showTaskManager}
          closeTaskManager={closeTaskManager}
        />
      </div>
      <AddSectionContainer toggleSectionManager={toggleSectionManager} setToggleSectionManager={setToggleSectionManager} index={0} />
    </>
  );
};

const Header = () => {
  return (
    <div className='flex flex-row justify-between cursor-pointer pb-2 border-b border-gray-200 font-bold'>
      <h2 className='font-bold text-xl'>Inbox</h2>
      <MoreIcon className='w-6' />
    </div>
  );
};

const AddSectionContainer = ({ toggleSectionManager, setToggleSectionManager, index }) => {
  const AddSectionButton = () => {
    return (
      <span
        className={`block text-red-600 overflow-hidden text-center ${toggleSectionManager !== null ? 'hover:opacity-0 mt-6 mb-2 cursor-auto' : 'hover:opacity-100 my-6'} cursor-pointer opacity-0 before:content-[''] after:content-['']
          before:inline-block after:inline-block before:h-px after:h-px before:relative after:relative before:align-middle after:align-middle
          before:w-1/2 after:w-1/2 before:bg-red-600 after:bg-red-600 before:right-3 before:ml-[-50%] after:left-3 after:mr-[-50%]`}
          onClick={() => setToggleSectionManager(index)}
      >
        Add Section
      </span>
    )
  };

  return (
    <>
      <AddSectionButton />
      { toggleSectionManager === index && <AddSectionManager index={index} close={() => setToggleSectionManager(null)} /> }
    </>
  );
};

const getSortedListByOrder = list => list.sort((a, b) => a.order - b.order);

const Container = () => {
  const { sections } = useSection();
  const { tasks } = useTask();
  const [activeTaskManager, setActiveTaskManager] = useState();
  const [toggleSectionManager, setToggleSectionManager] = useState(null);

  return (
    <div className='mx-16 mt-8'>
      <div className='max-w-4xl mx-auto overflow-y-scroll'>
        <Header />
        <Unsection
          tasks={getSortedListByOrder(tasks.filter(task => !task.sectionId)).map(task => <TaskLine key={task.id} task={task} isAddTaskManagerOpened={activeTaskManager === 'unsectioned'} />)}
          activeTaskManager={activeTaskManager}
          showTaskManager={() => setActiveTaskManager('unsectioned')}
          closeTaskManager={() => setActiveTaskManager()}
          toggleSectionManager={toggleSectionManager}
          setToggleSectionManager={setToggleSectionManager}
        />
        { getSortedListByOrder(sections).map((section, index) => (
            <Section
              tasks={getSortedListByOrder(tasks.filter(task => task.sectionId === section.id)).map(task => <TaskLine key={task.id} task={task} isAddTaskManagerOpened={activeTaskManager === section.id} />)}
              index={index + 1}
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