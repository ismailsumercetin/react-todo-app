import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
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
