import { createContext, useContext, useEffect, useState } from 'react';
import { getProjectsByUserId } from '../api';

const ProjectContext = createContext({});

export const ProjectProvider = ({children}) => {
  const [projects, setProjects] = useState([]);

  async function fetchSections() {
    const _sections = await getProjectsByUserId(1);
    setProjects(_sections);
  }

  useEffect(() => {
    fetchSections();
  }, []);

  const value = {
    projects,
    setProjects
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
};

export default function useProject() {
  return useContext(ProjectContext);
}