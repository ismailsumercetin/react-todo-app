import { createContext, useContext, useState } from 'react';

const UIContext = createContext({});

export const UIProvider = ({children}) => {
  const [modalConfigs, setModalConfigs] = useState({
    shouldShow: false,
    modalName: ''
  });

  const value = {
    modalConfigs,
    setModalConfigs
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
};

export default function useUI() {
  return useContext(UIContext);
}