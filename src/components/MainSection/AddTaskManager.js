import { useState, useRef, useEffect } from 'react';
import ContentEditable from 'react-contenteditable';
import uuid from 'react-uuid';
import useTask from '../../contexts/useTask';

const AddTaskManager = ({ close, sectionId }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const taskNameEl =  useRef();
  const taskDescEl =  useRef();
  const { addTask, getNewOrderValue } = useTask();

  useEffect(() => { taskNameEl.current.focus(); }, []);

  return (
  <div className='cursor-pointer border border-gray-10 rounded-lg focus-within:border-gray-400'>
    <div className='max-h-64 px-4 py-2'>
      <ContentEditable
        innerRef={taskNameEl}
        html={taskName}
        className='focus:outline-none font-normal text-base cursor-text mb-1 empty:before:content-[attr(placeholder)] empty:before:text-gray-400'
        placeholder='Task name'
        disabled={false}
        onChange={e => setTaskName(e.target.value)}
        tagName='div'
      />
      <ContentEditable
        innerRef={taskDescEl}
        html={taskDescription}
        className='focus:outline-none text-sm font-light cursor-text empty:before:content-[attr(placeholder)] empty:before:text-gray-400'
        placeholder='Description'
        disabled={false}
        onChange={e => setTaskDescription(e.target.value)}
        tagName='div'
      />
    </div>
    <div className='px-4 py-2'>
      <div>
      { /* priority dropdown comes here */}
      </div>
    </div>
    <div className='flex flex-row justify-between items-center border-t px-4 py-2'>
      <div>
        { /* empty for now */}
      </div>
      <div className='flex flex-row'>
        <div
          onClick={close}
          className='px-4 py-2 rounded-md bg-gray-100 text-sm mr-2 hover:bg-gray-200'
        >
          Cancel
        </div>
        <div
          className={`px-4 py-2 rounded-md bg-gray-100 text-sm bg-red-600 text-white hover:bg-red-700 ${taskName.length === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
          onClick={() => {
            if (taskName === '') return;

            const taskId = uuid();
            const task = {
              id: taskId,
              ...(sectionId && { sectionId }),
              title: taskName,
              description: taskDescription,
              userId: 1,
              priority: 'P4',
              projectId: '',
              completed: false,
              order: getNewOrderValue(sectionId)
            };
            addTask(task);
            setTaskName('');
            setTaskDescription('');
            taskNameEl.current.focus();
          }}
        >
          Add task
        </div>
      </div>
    </div>
  </div>
)
};

export default AddTaskManager;
