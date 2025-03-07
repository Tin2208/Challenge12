import React, { useEffect, useState } from "react";
import "./addTask.scss";
import { IoMdClose } from "react-icons/io";
import AOS from "aos";
import "aos/dist/aos.css";
import { notification } from "antd";
import "@ant-design/v5-patch-for-react-19";

const AddTask = ({ isOpen, onClose, addTask }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("incomplete");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (isOpen) {
      AOS.refreshHard();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      notification.error({
        message: "Please enter a title.",
        description: "",
        placement: "bottomRight",
        duration: 3,
      });
      return;
    }

    if (typeof addTask !== "function") {
      return;
    }

    addTask(title, status);

    // Hiển thị thông báo thành công với Ant Design
    notification.success({
      message: "Task added successfully.",
      description: "",
      placement: "bottomRight",
      duration: 3,
    });

    setTitle("");
    setStatus("incomplete");
    onClose();
  };

  return (
    <>
      <div className={`addTask ${isOpen ? "show" : ""}`}>
        <div
          className="addTask__modal"
          data-aos="zoom-in"
          data-aos-duration="300"
        >
          <div className="addTask__close">
            <button data-aos={isOpen ? "fade-up" : ""} onClick={onClose}>
              <IoMdClose />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <h2 className="addTask__title">ADD TODO</h2>
            <label className="addTask__label">Title</label>
            <input
              type="text"
              className="addTask__input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className="addTask__label">Status</label>
            <select
              className="addTask__select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="incomplete">Incomplete</option>
              <option value="complete">Complete</option>
            </select>
            <div className="addTask__buttons">
              <button type="submit" className="addTask__add btn--primary">
                Add Task
              </button>
              <button
                type="button"
                onClick={onClose}
                className="addTask__cancel btn--secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTask;
