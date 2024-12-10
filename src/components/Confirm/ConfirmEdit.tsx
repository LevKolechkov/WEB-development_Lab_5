import { useEffect, useState, ChangeEvent } from "react";
import "./Confirm.scss";

interface Task {
  id: string;
  title: string;
  about: string;
  isMenuOpened: boolean;
}

interface ConfirmEditProps {
  show: boolean;
  task: Task;
  onSave: (updatedTask: Task) => void;
  onCancel: () => void;
}

const ConfirmEdit: React.FC<ConfirmEditProps> = ({
  show,
  task,
  onSave,
  onCancel,
}) => {
  const [editedTask, setEditedTask] = useState<Task>(task);

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  if (!show) return null;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedTask);
  };

  return (
    <div className="overlay">
      <div className="edit">
        <input
          type="text"
          name="title"
          className="edit__mini-input"
          placeholder="Max input"
          value={editedTask.title}
          onChange={handleChange}
        />
        <textarea
          name="about"
          className="edit__max-input"
          placeholder="Max input"
          value={editedTask.about}
          onChange={handleChange}
        ></textarea>
        <div className="edit__buttons">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEdit;
