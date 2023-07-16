import { collection, query, where, getDocs, doc, setDoc, updateDoc, increment } from "firebase/firestore";
import db from '../firebase';

export const getTasksByUserId = async (userId) => {
  const _query = query(collection(db, "task"), where("userId", "==", userId));
  const querySnapshot = await getDocs(_query);
  const tasks = [];
  querySnapshot.forEach((doc) => {
    tasks.push({ id: doc.id, ...doc.data() });
  });
  return tasks;
};

export const createTask = async (taskId, task) => {
  await setDoc(doc(db, "task", taskId), task);
};

export const getSectionsByUserId = async (userId) => {
  const _query = query(collection(db, "section"), where("userId", "==", userId));
  const querySnapshot = await getDocs(_query);
  const sections = [];
  querySnapshot.forEach((doc) => {
    sections.push({ id: doc.id, ...doc.data() });
  });
  return sections;
};

export const createSection = async (sectionId, section, filteredSections) => {
  await setDoc(doc(db, "section", sectionId), section);
  for (const _section of filteredSections) {
     await updateDoc(doc(db, "section", _section.id), {
      order: increment(1)
    });
  }
};

export const getProjectsByUserId = async (userId) => {
  const _query = query(collection(db, "project"), where("userId", "==", userId));
  const querySnapshot = await getDocs(_query);
  const projects = [];
  querySnapshot.forEach((doc) => {
    projects.push({ id: doc.id, ...doc.data() });
  });
  return projects;
};
