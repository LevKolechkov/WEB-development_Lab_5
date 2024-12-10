import { useDispatch, useSelector } from "react-redux";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DndContext, closestCorners } from "@dnd-kit/core";
import Todo from "./Todo";
import NoTasks from "../NoTasks/NoTasks";
import {
  selectTasks,
  deleteTask,
  toggleTask,
  editTask,
  moveTask,
} from "../../redux/slices/tasksSlice";

function TodoList() {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const toggleTaskHandler = (id) => {
    dispatch(toggleTask(id));
  };

  const updateTaskHandler = (id, changedTask) => {
    dispatch(editTask({ id, changedTask }));
  };

  const handleDragEnd = (event) => {
    dispatch(moveTask(event));
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <ul id="taskList">
        {tasks.length === 0 ? (
          <NoTasks />
        ) : (
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <Todo
                key={task.id}
                task={task}
                deleteTask={handleDeleteTask}
                toggleTask={toggleTaskHandler}
                updateTask={updateTaskHandler}
              />
            ))}
          </SortableContext>
        )}
      </ul>
    </DndContext>
  );
}

export default TodoList;
