import { useState } from "react";
import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ConfirmDelete from "../Confirm/ConfirmDelete";
import ConfirmEdit from "../Confirm/ConfirmEdit";
import Share from "../Share/Share";
import shareIcon from "../../assets/images/menu/share.svg";
import infoIcon from "../../assets/images/menu/info.svg";
import editIcon from "../../assets/images/menu/edit.svg";
import { Task } from "../interfaces/Task";
import "../Todos/TodoList.scss";

interface TodoProps {
  task: Task;
  isDragable: boolean;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  toggleFavorite: (id: string) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
}

const Todo: React.FC<TodoProps> = ({
  task,
  deleteTask,
  toggleTask,
  updateTask,
  toggleFavorite,
}) => {
  const taskId = task.id;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: taskId,
    });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [showConfirmEdit, setShowConfirmEdit] = useState<boolean>(false);
  const [showShareMenu, setShowShare] = useState<boolean>(false);

  const handleConfirmDelete = () => {
    deleteTask(task.id);
    setShowConfirmDelete(false);
  };

  const handleDeleteClick = () => {
    setShowConfirmDelete(true);
  };

  const handleSaveEdit = (editedTask: Partial<Task>) => {
    updateTask(task.id, editedTask);
    setShowConfirmEdit(false);
  };

  const handleEditClick = () => {
    setShowConfirmEdit(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };

  const handleCancelEdit = () => {
    setShowConfirmEdit(false);
  };

  const handleShareClick = () => {
    setShowShare(true);
  };

  const handleShareCancel = () => {
    setShowShare(false);
  };

  return (
    <>
      <li style={style} className="task">
        <div className="container" onClick={() => toggleTask(task.id)}>
          <div className="container__text">
            <div
              className={task.isDragable ? "dragable" : "not-dragable"}
              {...attributes}
              {...listeners}
              ref={setNodeRef}
            ></div>
            <h1>{task.title}</h1>
            <h2>{task.about}</h2>
          </div>
          {task.isFavorite ? (
            <BsBookmarkStarFill
              className="star-icon"
              onClick={(event) => {
                event.stopPropagation();
                toggleFavorite(task.id);
              }}
            />
          ) : (
            <BsBookmarkStar
              className="star-icon"
              onClick={(event) => {
                event.stopPropagation();
                toggleFavorite(task.id);
              }}
            />
          )}
          <button
            onClick={(event) => {
              event.stopPropagation();
              handleDeleteClick();
            }}
          >
            x
          </button>
        </div>
        <div className={`menu${task.isMenuOpened ? " visible" : ""}`}>
          <button>
            <img
              src={shareIcon}
              alt="share"
              onClick={(event) => {
                event.stopPropagation();
                handleShareClick();
              }}
            />
          </button>
          <button>
            <img src={infoIcon} alt="info" />
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation();
              handleEditClick();
            }}
          >
            <img src={editIcon} alt="edit" />
          </button>
        </div>
      </li>
      <ConfirmDelete
        show={showConfirmDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <ConfirmEdit
        show={showConfirmEdit}
        task={task}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />
      <Share show={showShareMenu} onCancel={handleShareCancel} />
    </>
  );
};

export default Todo;
