import React, { useState, useEffect } from "react";
import "./header.scss";
import AddTask from "../addTask/AddTask";

const Header = ({ addTask, setFilterStatus }) => { // 👈 Nhận addTask từ props
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("isOpen updated:", isOpen);
  }, [isOpen]);

  return (
    <div>
      <div className="header wrapper">
        <h1>TODO LIST</h1>
        <div className="header__buttons">
          <button
            className="btn--primary"
            onClick={() => {
              setIsOpen(true);
              console.log("isOpen:", isOpen);
            }}
          >
            Add Task
          </button>
          <select onChange={(e) => setFilterStatus(e.target.value)}>
            <option value='All'>All</option>
            <option value="Incomplete">Incomplete</option>
            <option value="Complete">Complete</option>
          </select>
        </div>
      </div>
      {isOpen && <AddTask isOpen={isOpen} onClose={() => setIsOpen(false)} addTask={addTask} />} {/* 👈 Truyền addTask vào */}
    </div>
  );
};

export default Header;
