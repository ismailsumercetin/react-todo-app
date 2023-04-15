import { createContext, useContext, useState } from 'react';
import { SECTIONS } from '../mockdata';

const SectionContext = createContext({});

export const SectionProvider = ({children}) => {
  const [sections, setSections] = useState(SECTIONS);

  const getSectionById = id => sections.find(section => section.id === id);

  const value = {
    sections,
    getSectionById
  };

  return <SectionContext.Provider value={value}>{children}</SectionContext.Provider>
};

export default function useSection() {
  return useContext(SectionContext);
}