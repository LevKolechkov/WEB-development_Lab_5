import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { arrayMove } from "@dnd-kit/sortable";
import { Task } from "../../components/interfaces/Task";

const storedTasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
storedTasks.forEach((task) => (task.isMenuOpened = false));
const initialState: Task[] = [...storedTasks];

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state));
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const newState = state.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(newState));
      return newState;
    },
    editTask: (
      state,
      action: PayloadAction<{
        id: string;
        changedTask: { title: string; about: string };
      }>,
    ) => {
      const newState = state.map((task) =>
        task.id === action.payload.id
          ? {
              ...task,
              title: action.payload.changedTask.title,
              about: action.payload.changedTask.about,
            }
          : task,
      );
      localStorage.setItem("tasks", JSON.stringify(newState));
      return newState;
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const newState = state.map((task) =>
        task.id === action.payload
          ? { ...task, isMenuOpened: !task.isMenuOpened }
          : { ...task, isMenuOpened: false },
      );
      localStorage.setItem("tasks", JSON.stringify(newState));
      return newState;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const newState = state.map((task) =>
        task.id === action.payload
          ? {
              ...task,
              isFavorite: true,
              isDragable: false,
            }
          : { ...task },
      );
      localStorage.setItem("tasks", JSON.stringify(newState));
      return newState;
    },
    unToggleFavorite: (state, action: PayloadAction<string>) => {
      const newState = state.map((task) =>
        task.id === action.payload
          ? {
              ...task,
              isFavorite: false,
              isDragable: true,
            }
          : { ...task },
      );
      localStorage.setItem("tasks", JSON.stringify(newState));
      return newState;
    },
    loadTasks: () => {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]") as Task[];
      tasks.forEach((task) => (task.isMenuOpened = false));
      return tasks;
    },
    moveTask: (
      state,
      action: PayloadAction<{ active: { id: string }; over: { id: string } }>,
    ) => {
      const { active, over } = action.payload;

      if (active.id === over.id) return state;

      const originalPos = state.findIndex((task) => task.id === active.id);
      const newPos = state.findIndex((task) => task.id === over.id);

      const newState = arrayMove([...state], originalPos, newPos);

      localStorage.setItem("tasks", JSON.stringify(newState));
      return newState;
    },
  },
});

export const {
  addTask,
  deleteTask,
  editTask,
  toggleTask,
  toggleFavorite,
  unToggleFavorite,
  loadTasks,
  moveTask,
} = tasksSlice.actions;

export const selectTasks = (state: { tasks: Task[] }) => state.tasks;

export default tasksSlice.reducer;
