import { ChevronDownIcon, PlusIcon } from "../icons";

const Sidebar = () => {
  return (
    <aside className="p-4 sidebar bg-zinc-50">
      <div className="p-2 hover:bg-zinc-200 rounded-md cursor-pointer">
        <h3>Inbox</h3>
      </div>
      <div className="flex items-center justify-between p-2 hover:bg-zinc-200 rounded-md cursor-pointer">
        <h3 className="text-zinc-500">Projects</h3>
        <div className="flex items-center">
          <span
            className='mr-2 border border-transparent hover:rounded-sm hover:bg-zinc-300'
          ><PlusIcon fill="#676767" width='20px' /></span>
          <span className="border border-transparent hover:rounded-sm hover:bg-zinc-300"><ChevronDownIcon fill="#676767" width='20px' /></span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;