import { createContext, useContext, useEffect, useState } from 'react';
import { createSection, getSectionsByUserId } from '../api';

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

  const addSection = section => {
    let filteredSections = [];
    const sectionsWithOrderUpdated = sections.reduce((prev, cur) => {
      const _cur = { ...cur };
      if (_cur.order >= section.order) {
        _cur.order += 1;
        filteredSections = [...filteredSections, _cur];
      }
      return [...prev, _cur];
    }, []);
    setSections([...sectionsWithOrderUpdated, section]);
    createSection(section.id, section, filteredSections);
  };

  const value = {
    sections,
    getSectionById,
    addSection
  };

  return <SectionContext.Provider value={value}>{children}</SectionContext.Provider>
};

export default function useSection() {
  return useContext(SectionContext);
}