import React, { useState } from "react";
import "./content.scss";
import CheckBox from "../../assets/checkbox.svg";
import { MdEdit, MdDelete } from "react-icons/md";

const Content = ({ tasks, onDelete, onEdit, filterStatus }) => {
  const [checkedTasks, setCheckedTasks] = useState({});

  // Lọc danh sách dựa trên filterStatus
  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "All") return true;
    return task.status === filterStatus.toLowerCase();
  });

  const handleCheckboxClick = (task) => {
    const newStatus = task.status === "incomplete" ? "complete" : "incomplete";

    setCheckedTasks((prev) => ({
      ...prev,
      [task.id]: newStatus === "Incomplete", // Khi hoàn thành thì bỏ checked
    }));

    task.status = newStatus;
  };

  return (
    <div className="content">
      <div className="content__list">
        {filteredTasks.length === 0 ? (
          <div className="content__noTodos">
            <p>No todos</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div className="content__list__item" key={task.id}>
              <div className="content__infos">
                <div
                  className={`content__checkbox ${
                    checkedTasks[task.id] || task.status === "incomplete"
                      ? "checked"
                      : ""
                  }`}
                  onClick={() => handleCheckboxClick(task)}
                >
                  {!checkedTasks[task.id] && (
                    <img src={CheckBox} alt="Checkbox" />
                  )}
                </div>
                <div className="content__text">
                  <p
                    className={`content__text--work ${
                      task.status === "incomplete" ? "incomplete" : "complete"
                    }`}
                  >
                    {task.title}
                  </p>
                  <div className="content__text--times">
                    <span>{task.timestamp}</span>
                  </div>
                </div>
              </div>
              <div className="content__buttons">
                <button
                  className="content__buttons--delete"
                  onClick={() => onDelete(task.id)}
                >
                  <MdDelete />
                </button>
                <button
                  className="content__buttons--edit"
                  onClick={() => onEdit(task)}
                >
                  <MdEdit />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Content;
