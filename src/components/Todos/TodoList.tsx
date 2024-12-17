import { useDispatch, useSelector } from "react-redux";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DndContext, closestCorners } from "@dnd-kit/core";
import Todo from "../Todo/Todo";
import NoTasks from "../NoTasks/NoTasks";
import NoFavoriteTasks from "../NoTasks/NoFavoriteTasks";
import Breaker from "../Breaker/Breaker";
import {
  selectTasks,
  deleteTask,
  toggleTask,
  editTask,
  moveTask,
  toggleFavorite,
  unToggleFavorite,
} from "../../redux/slices/tasksSlice";
import { Task } from "../interfaces/Task";
import { useState, useEffect } from "react";

function TodoList() {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  const [favoriteTasks, setFavoriteTasks] = useState<Task[]>([]);
  const [notFavoriteTasks, setNotFavoriteTasks] = useState<Task[]>([]);

  useEffect(() => {
    setFavoriteTasks(tasks.filter((task) => task.isFavorite));
    setNotFavoriteTasks(tasks.filter((task) => !task.isFavorite));
  }, [tasks]);

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  const toggleTaskHandler = (id: string) => {
    dispatch(toggleTask(id));
  };

  const toggleFavoriteHandler = (id: string) => {
    if (favoriteTasks.length >= 3) {
      alert("Нельзя закрепить более 3 задач.");
    } else dispatch(toggleFavorite(id));
  };

  const unToggleFavoriteHandler = (id: string) => {
    dispatch(unToggleFavorite(id));
  };

  const updateTaskHandler = (id: string, changedTask: any) => {
    dispatch(editTask({ id, changedTask }));
  };

  const handleDragEnd = (event: any) => {
    dispatch(moveTask(event));
  };

  return (
    <>
      <ul className="tasksList">
        {favoriteTasks.length === 0 ? (
          <NoFavoriteTasks />
        ) : (
          <>
            {favoriteTasks.map((task) => (
              <Todo
                key={task.id}
                task={task}
                isDragable={false}
                deleteTask={handleDeleteTask}
                toggleTask={toggleTaskHandler}
                toggleFavorite={unToggleFavoriteHandler}
                updateTask={updateTaskHandler}
              />
            ))}
            <Breaker></Breaker>
          </>
        )}
      </ul>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <ul className="tasksList">
          {tasks.length === 0 ? (
            <NoTasks />
          ) : (
            <>
              <SortableContext
                items={tasks}
                strategy={verticalListSortingStrategy}
              >
                {notFavoriteTasks.map((task) => (
                  <Todo
                    key={task.id}
                    task={task}
                    isDragable={true}
                    deleteTask={handleDeleteTask}
                    toggleTask={toggleTaskHandler}
                    toggleFavorite={toggleFavoriteHandler}
                    updateTask={updateTaskHandler}
                  />
                ))}
              </SortableContext>
            </>
          )}
        </ul>
      </DndContext>
    </>
  );
}

export default TodoList;
