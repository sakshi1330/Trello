import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../environment/environment";

function requireUid() {
  const uid = auth.currentUser?.uid;
  if (!uid) {
    throw new Error("You are not logged in. Please log in again.");
  }
  return uid;
}

export async function createTask(name, deadline, checklist) {
  const uid = requireUid();

  if (!name.trim()) throw new Error("Please enter a task name.");

  const normalizedChecklist = checklist
    .map((item) => (typeof item === "string" ? item.trim() : item.name?.trim()))
    .filter(Boolean)
    .map((item) => ({ name: item, completed: false }));

  const taskRef = await addDoc(collection(db, "tasks"), {
    name: name.trim(),
    deadline,
    status: "pending",
    checklist: normalizedChecklist,
    assignedTo: uid,
    createdAt: serverTimestamp(),
  });

  return taskRef.id;
}

export async function fetchMyTasks() {
  const uid = requireUid();
  const q = query(collection(db, "tasks"), where("assignedTo", "==", uid));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
    checklist: Array.isArray(item.data().checklist) ? item.data().checklist : [],
  }));
}

export async function updateTask(taskId, changes) {
  requireUid();
  await updateDoc(doc(db, "tasks", taskId), changes);
}

export async function deleteTask(taskId) {
  requireUid();
  await deleteDoc(doc(db, "tasks", taskId));
}

export async function fetchTaskByStatus(status) {
  const tasks = await fetchMyTasks();
  return status === "all"
    ? tasks.length
    : tasks.filter((task) => task.status === status).length;
}
