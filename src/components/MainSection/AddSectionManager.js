import { useState, useRef, useEffect } from 'react';
import ContentEditable from 'react-contenteditable';

const AddSectionManager = ({ close }) => {
  const [sectionName, setsectionName] = useState('');
  const sectionNameEl =  useRef();

  useEffect(() => { sectionNameEl.current.focus(); }, []);

  return (
  <div className='mb-6'>
    <div className='overflow-scroll max-h-64 px-4 py-2 border border-gray-10 rounded-lg focus-within:border-gray-400'>
      <ContentEditable
        innerRef={sectionNameEl}
        html={sectionName}
        className='focus:outline-none font-normal text-base cursor-text empty:before:content-[attr(placeholder)] empty:before:text-gray-400'
        placeholder='Name this section'
        disabled={false}
        onChange={e => setsectionName(e.target.value)}
        tagName='div'
      />
    </div>
    <div className='flex flex-row items-center py-2'>
      <div className='flex flex-row'>
        <div
          className={`px-4 py-2 rounded-md bg-gray-100 mr-2 text-sm bg-red-600 text-white hover:bg-red-700 ${sectionName.length === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
          onClick={() => {}}
        >
          Add section
        </div>
        <div
          onClick={close}
          className='cursor-pointer px-4 py-2 rounded-md bg-gray-100 text-sm hover:bg-gray-200'
        >
          Cancel
        </div>
      </div>
    </div>
  </div>
)
};

export default AddSectionManager;
