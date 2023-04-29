import { createContext, useContext, useEffect, useState } from 'react';
import { getSectionsByUserId } from '../api';

const SectionContext = createContext({});

export const SectionProvider = ({children}) => {
  const [sections, setSections] = useState([]);

  async function fetchSections() {
    const _sections = await getSectionsByUserId(1);
    setSections(_sections);
  }

  useEffect(() => {
    fetchSections();
  }, []);

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