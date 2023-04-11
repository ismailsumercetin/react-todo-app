import { CheckIcon, DragIcon } from '../../icons';

const TaskLine = ({ task }) => {
  const {
    title,
    description
  } = task;
  return (
    <div className='flex flex-row cursor-pointer group/line'>
      <div className='w-6 h-6 pt-3'>
        <DragIcon className='group-hover/line:block hidden hover:bg-gray-100 hover:rounded-sm' />
      </div>
      <div className='border-b border-gray-200 py-3 ml-2 w-full'>
        <div className='flex flex-row items-center mb-1'>
          <span className='group flex items-center justify-center border rounded-full border-gray-500 w-5 h-5 mr-2'>
            <CheckIcon className='group-hover:block hidden w-3 h-3' />
          </span>
          <div>{title}</div>
        </div>
        <div className='ml-7 text-sm text-gray-500'>{description}</div>
      </div>
    </div>
  )
}

export default TaskLine;