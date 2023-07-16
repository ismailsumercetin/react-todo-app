import AddProject from './AddProject';
import useUI from '../../contexts/useUI';

const ModalRenderer = () => {
  const { modalConfigs } = useUI();

  const Modal = () => {
    switch (modalConfigs.modalName) {
      case 'addProject':
        return <AddProject/>;
      default:
        break;
    }
  };

  return (
    <>
      { modalConfigs.shouldShow && <Modal/> }
    </>
  );
};

export default ModalRenderer;
