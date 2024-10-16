import { useState } from "react";
import "./TaskCard.css";

function TaskCard({ children, action, doneState }) {
  const [isActive, seIsActive] = useState(true);
  const [isDone, setIsDone] = useState(doneState);

  const toggleDone = () => {
    setIsDone(!isDone);
  };

  const hideTask = () => {
    seIsActive(false);
  };

  let onClickStatement = action;

  if (onClickStatement === undefined) {
    onClickStatement = hideTask;
  }

  return (
    <>
      <div
        onClick={toggleDone}
        className={`${isActive ? "task-card" : "unactive"}`}
      >
        <span
          className="task-text"
          style={{ textDecoration: isDone ? "line-through" : "none" }}
        >
          {children}
        </span>
        <span className="close" onClick={onClickStatement}>
          ×
        </span>
      </div>
    </>
  );
}

export default TaskCard;
